import type { UserRole } from '@prisma/client';
import type { Request } from 'express';
import type session from 'express-session';

export { UserRole } from '@prisma/client';

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
