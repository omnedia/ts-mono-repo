import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IUser } from '@shared/interfaces';
import { UserRole } from '../types/types';

@Entity()
export class User implements IUser {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 1, description: 'Unique identifier of the user' })
  id: number;

  @Column({ unique: true })
  @ApiProperty({
    example: 'test@test.test',
    description: 'Unique email for the user',
  })
  email: string;

  @Column()
  @ApiProperty({
    example: 'hashedpassword123',
    description: 'User password (hashed)',
    writeOnly: true,
  })
  @Exclude()
  password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  @ApiProperty({
    example: 'user',
    enum: UserRole,
    description: 'Role of the user',
  })
  role: UserRole;

  @CreateDateColumn()
  @ApiProperty({
    example: '2024-02-08T12:00:00.000Z',
    description: 'Timestamp when the user was created',
  })
  @Exclude()
  createdAt: Date;
}
