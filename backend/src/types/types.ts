import type { Request } from 'express';
import type { UnitAnyCase } from 'ms';
import type session from 'express-session';

export interface AuthRequest extends Request {
  user: SessionUser;
  session: session.Session &
    Partial<session.SessionData> & {
      user?: SessionUser;
    };
}

export interface SessionUser {
  id: number;
  email: string;
  role: UserRole;
}

export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
}

export type StringValue =
  | `${number}`
  | `${number}${UnitAnyCase}`
  | `${number} ${UnitAnyCase}`;
