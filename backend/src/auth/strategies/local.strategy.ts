import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { UserRole } from '../../types/user.types';
import { UserService } from '../user.service';

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
