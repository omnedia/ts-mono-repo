import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user.service';
import { UserRole } from '../../types/types';

interface ValidateResult {
  email: string;
  userId: number;
  role: UserRole;
}

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<ValidateResult> {
    const user = await this.userService.validateUser(email, password);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return { email: user.email, userId: user.id, role: user.role };
  }
}
