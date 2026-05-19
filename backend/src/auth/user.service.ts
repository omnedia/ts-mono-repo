import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserRepository } from '../entities/user/user.repository';
import type { UserSchema } from '../entities/user/user.types';
import { SessionUser } from '../types/types';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(email: string, password: string): Promise<UserSchema> {
    if (!email || !password) {
      throw new BadRequestException('No credentials received.');
    }

    const existingUser = await this.userRepository.findByEmail(email);

    if (existingUser) {
      throw new ConflictException('E-Mail is already in use.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    return this.userRepository.create(email, hashedPassword);
  }

  async findOne(email: string): Promise<UserSchema> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new NotFoundException('No user found.');
    }

    return user;
  }

  async validateUser(email: string, password: string): Promise<UserSchema | null> {
    const user = await this.findOne(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    return null;
  }

  async changePassword(user: SessionUser, password: string): Promise<void> {
    const userEntity = await this.findOne(user.email);

    if (!userEntity) {
      throw new NotFoundException('User does not exist');
    }

    userEntity.password = await bcrypt.hash(password, 10);

    await this.userRepository.updatePassword(userEntity.id, userEntity.password);
  }
}
