import { pgEnum, pgTable, serial, timestamp, varchar } from 'drizzle-orm/pg-core';
import { UserRole } from '../../types/types';

export const userRoleEnum = pgEnum('user_role_enum', [UserRole.USER, UserRole.ADMIN]);

export const users = pgTable('user', {
  id: serial('id').primaryKey(),
  email: varchar('email').notNull().unique(),
  password: varchar('password').notNull(),
  role: userRoleEnum('role').notNull().default(UserRole.USER),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
});
