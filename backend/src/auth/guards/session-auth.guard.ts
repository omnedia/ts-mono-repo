import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from '../../entities/user/user.repository';
import { SessionUser } from '../../types/types';

@Injectable()
export class SessionAuthGuard implements CanActivate {
  constructor(private readonly userRepository: UserRepository) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();

    const sessionUser = req.session?.user as SessionUser;
    if (!sessionUser || !sessionUser.email) {
      throw new UnauthorizedException();
    }

    const user = await this.userRepository.findByEmail(sessionUser.email);

    if (!user) {
      throw new UnauthorizedException();
    }

    req.user = {
      userId: user.id,
      email: user.email,
      role: user.role,
    };

    return true;
  }
}
