import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthRequest } from '../types/types';
import { CookieOptions } from 'csurf';
import { Request as ERequest } from 'express';
import { doubleCsrf } from 'csrf-csrf';

@Injectable()
export class AuthService {
  constructor(private readonly configService: ConfigService) {}

  async login(req: AuthRequest, staySignedIn: boolean): Promise<void> {
    const user = req.user;
    (req as any).session.user = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    req.session.cookie.maxAge = staySignedIn
      ? this.durationToMs(
          this.configService.get<string>('SESSION_STAY_SIGNED_IN_EXPIRATION'),
        )
      : this.durationToMs(this.configService.get<string>('SESSION_EXPIRATION'));

    req.session.touch();

    await new Promise<void>((resolve, reject) =>
      req.session.save((err) => (err ? reject(err) : resolve())),
    );
  }

  logout(req: ERequest): Promise<void> {
    const sessionOptions = this.getSessionCookieOptions();

    return new Promise((resolve) => {
      req.session.destroy(() => {
        req.res?.clearCookie('sid', {
          domain: sessionOptions.domain,
          path: sessionOptions.path,
        });
        resolve();
      });
    });
  }

  getSessionCookieOptions(): Pick<
    CookieOptions,
    'domain' | 'path' | 'httpOnly' | 'secure' | 'sameSite' | 'maxAge'
  > {
    const domain = this.configService.get<string>('SESSION_COOKIE_DOMAIN');

    return {
      domain: domain || undefined,
      path: '/',
      httpOnly: true,
      secure: this.configService.get<string>('NODE_ENV') === 'prod',
      sameSite: 'lax',
      maxAge: this.durationToMs(
        this.configService.get<string>('SESSION_EXPIRATION'),
      ),
    };
  }

  createDoubleCsrfConfig() {
    return doubleCsrf({
      getSecret: () => this.configService.get<string>('CSRF_SECRET')!,
      getSessionIdentifier: (req) => (req as any).sessionID,
      cookieName: 'csrf',
      cookieOptions: this.getSessionCookieOptions(),
      getCsrfTokenFromRequest: (req) => req.headers['x-csrf-token'] as string,
    });
  }

  private durationToMs(value?: string): number {
    if (!value) {
      throw new Error(
        `Invalid duration format: .env variable missing for session ttl.`,
      );
    }

    const match = value.trim().match(/^(\d+)\s*([smhd])$/i);
    if (!match) {
      throw new Error(
        `Invalid duration format: "${value}" (expected 10s | 5m | 1h | 7d)`,
      );
    }

    const amount = Number(match[1]);
    const unit = match[2].toLowerCase();

    switch (unit) {
      case 's':
        return amount * 1000;
      case 'm':
        return amount * 60 * 1000;
      case 'h':
        return amount * 60 * 60 * 1000;
      case 'd':
        return amount * 24 * 60 * 60 * 1000;
      default:
        throw new Error(`Unsupported duration unit: ${unit}`);
    }
  }
}
