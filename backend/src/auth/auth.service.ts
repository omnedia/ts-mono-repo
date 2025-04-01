import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { IAuthResponse } from '@shared/interfaces';
import { AuthRequest } from '../types/types';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  login(req: AuthRequest, staySignedIn: boolean): IAuthResponse {
    const user = req.user;

    const payload = { email: user.email, userId: user.userId, role: user.role };

    const accessTokenExpires = this.configService.get<string>('JWT_EXPIRATION');
    const refreshTokenExpires = staySignedIn
      ? this.configService.get<string>('JWT_REFRESH_EXPIRATION')
      : this.configService.get<string>('JWT_EXPIRATION');

    return {
      access_token: this.jwtService.sign(payload, {
        secret: this.configService.get<string>('JWT_SECRET'),
        expiresIn: accessTokenExpires,
      }),
      refresh_token: this.jwtService.sign(payload, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
        expiresIn: refreshTokenExpires,
      }),
    };
  }

  refreshToken(req: AuthRequest): IAuthResponse {
    const user = req.user;

    const payload = { email: user.email, userId: user.userId, role: user.role };

    return {
      access_token: this.jwtService.sign(payload, {
        secret: this.configService.get<string>('JWT_SECRET'),
        expiresIn: this.configService.get<string>('JWT_EXPIRATION'),
      }),
    };
  }
}
