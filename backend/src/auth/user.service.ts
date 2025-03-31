import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../entities/user.entity';
import { UserRole } from '../types/types';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(email: string, password: string): Promise<User> {
    if (!email || !password) {
      throw new BadRequestException('No credentials received.');
    }

    const existingUser = await this.userRepository.findOneBy({
      email: email,
    });

    if (existingUser) {
      throw new ConflictException('E-Mail is already in use.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.userRepository.create({
      email,
      password: hashedPassword,
      role: UserRole.USER,
    });

    return this.userRepository.save(user);
  }

  async findOne(email: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      throw new NotFoundException('No user found.');
    }

    return user;
  }

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.findOne(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    return null;
  }

  async changePassword(user: User, password: string): Promise<void> {
    const userEntity = await this.findOne(user.email);

    if (!userEntity) {
      throw new NotFoundException('User does not exist');
    }

    userEntity.password = await bcrypt.hash(password, 10);

    await this.userRepository.update(userEntity.id, userEntity);
  }
}
