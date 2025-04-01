import { Request } from 'express';

export interface AuthRequest extends Request {
  user: {
    userId: number;
    email: string;
    role: string;
  };
}

export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
}
