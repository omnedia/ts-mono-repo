import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../entities/user.entity';
import { Repository } from 'typeorm';
import { SessionUser } from '../../types/types';

@Injectable()
export class SessionAuthGuard implements CanActivate {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();

    const sessionUser = req.session?.user as SessionUser;
    if (!sessionUser || !sessionUser.email) {
      throw new UnauthorizedException();
    }

    const user = await this.userRepository.findOne({
      where: { email: sessionUser.email },
    });

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
