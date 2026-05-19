import { Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { DatabaseService } from '../../database/database.service';
import { UserRole } from '../../types/types';
import { users } from './user.schema';
import type { UserSchema } from './user.types';

@Injectable()
export class UserRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(email: string, hashedPassword: string): Promise<UserSchema> {
    const [user] = await this.databaseService.db
      .insert(users)
      .values({
        email,
        password: hashedPassword,
        role: UserRole.USER,
      })
      .returning();

    return user;
  }

  async findByEmail(email: string): Promise<UserSchema | undefined> {
    const [user] = await this.databaseService.db.select().from(users).where(eq(users.email, email));

    return user;
  }

  async updatePassword(id: number, hashedPassword: string): Promise<void> {
    await this.databaseService.db
      .update(users)
      .set({ password: hashedPassword })
      .where(eq(users.id, id));
  }
}
