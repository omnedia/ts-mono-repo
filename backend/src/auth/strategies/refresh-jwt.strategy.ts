import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RefreshJwtStrategy extends PassportStrategy(
  Strategy,
  'refresh-jwt',
) {
  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_REFRESH_SECRET') ?? 'missing',
    });

    if (!configService.get<string>('JWT_REFRESH_SECRET')) {
      throw new Error('Missing JWT_REFRESH_SECRET in environment variables');
    }
  }

  async validate(payload: { email: string; userId: number; role: string }) {
    const user = await this.userRepository.findOne({
      where: { id: payload.userId },
    });

    if (!user) {
      return null;
    }

    return { email: user.email, userId: user.id, role: user.role };
  }
}
