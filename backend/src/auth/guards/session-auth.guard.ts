import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { SessionUser } from '../../types/user.types';

@Injectable()
export class SessionAuthGuard implements CanActivate {
  constructor(private readonly prismaService: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();

    const sessionUser = req.session?.user as SessionUser;
    if (!sessionUser || !sessionUser.email) {
      throw new UnauthorizedException();
    }

    const user = await this.prismaService.user.findUnique({
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
