import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { UserRole } from '../../types/types';
import type { users } from './user.schema';

export type UserSchema = typeof users.$inferSelect;

export class User implements UserSchema {
  @ApiProperty({ example: 1, description: 'Unique identifier of the user' })
  id: number;

  @ApiProperty({
    example: 'test@test.test',
    description: 'Unique email for the user',
  })
  email: string;

  @ApiProperty({
    example: 'hashedpassword123',
    description: 'User password (hashed)',
    writeOnly: true,
  })
  @Exclude()
  password: string;

  @ApiProperty({
    example: 'user',
    enum: UserRole,
    description: 'Role of the user',
  })
  role: UserRole;

  @ApiProperty({
    example: '2024-02-08T12:00:00.000Z',
    description: 'Timestamp when the user was created',
  })
  @Exclude()
  createdAt: Date;
}
