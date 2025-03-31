import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { User } from '../../entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET') ?? 'missing',
    });

    if (!configService.get<string>('JWT_SECRET')) {
      throw new Error('Missing JWT_SECRET in environment variables');
    }
  }

  async validate(payload: { email: string; userId: number; role: string }) {
    const user = await this.userRepository.findOne({
      where: { email: payload.email },
    });

    if (!user) {
      return null;
    }

    return { email: user.email, userId: user.id, role: user.role };
  }
}
