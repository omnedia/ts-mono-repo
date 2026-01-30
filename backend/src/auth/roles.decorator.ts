import { SetMetadata } from '@nestjs/common';
import type { UserRole } from '../types/types';

export const Roles = (...roles: UserRole[]) => SetMetadata('roles', roles);
