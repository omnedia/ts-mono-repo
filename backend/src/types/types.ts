import type { Request } from 'express';
import { UnitAnyCase } from 'ms';

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

export type StringValue =
  | `${number}`
  | `${number}${UnitAnyCase}`
  | `${number} ${UnitAnyCase}`;
