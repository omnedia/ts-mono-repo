import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import type { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../database/prisma.service';
import { SessionUser, UserRole } from '../types/user.types';
import { UserResponseDto } from './dto/user-response.dto';

const USER_RESPONSE_SELECT = {
  id: true,
  email: true,
  role: true,
} satisfies Prisma.UserSelect;

const AUTH_USER_SELECT = {
  ...USER_RESPONSE_SELECT,
  password: true,
} satisfies Prisma.UserSelect;

type AuthUser = Prisma.UserGetPayload<{ select: typeof AUTH_USER_SELECT }>;

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(email: string, password: string): Promise<UserResponseDto> {
    if (!email || !password) {
      throw new BadRequestException('No credentials received.');
    }

    const existingUser = await this.prismaService.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new ConflictException('E-Mail is already in use.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    return this.prismaService.user.create({
      data: {
        email,
        password: hashedPassword,
        role: UserRole.USER,
      },
      select: USER_RESPONSE_SELECT,
    });
  }

  async findOne(email: string): Promise<UserResponseDto> {
    const user = await this.prismaService.user.findUnique({
      where: { email },
      select: USER_RESPONSE_SELECT,
    });

    if (!user) {
      throw new NotFoundException('No user found.');
    }

    return user;
  }

  async validateUser(email: string, password: string): Promise<UserResponseDto | null> {
    const user = await this.findAuthUser(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      return {
        id: user.id,
        email: user.email,
        role: user.role,
      };
    }
    return null;
  }

  async changePassword(user: SessionUser, password: string): Promise<void> {
    const userEntity = await this.findAuthUser(user.email);

    if (!userEntity) {
      throw new NotFoundException('User does not exist');
    }

    await this.prismaService.user.update({
      where: { id: userEntity.id },
      data: { password: await bcrypt.hash(password, 10) },
    });
  }

  private async findAuthUser(email: string): Promise<AuthUser> {
    const user = await this.prismaService.user.findUnique({
      where: { email },
      select: AUTH_USER_SELECT,
    });

    if (!user) {
      throw new NotFoundException('No user found.');
    }

    return user;
  }
}
