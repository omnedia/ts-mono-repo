import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import * as session from 'express-session';
import * as cookieParser from 'cookie-parser';

import { createClient } from 'redis';
import { RedisStore } from 'connect-redis';

import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';

@Module({ imports: [AuthModule] })
export class MiddlewareModule implements NestModule {
  constructor(private readonly authService: AuthService) {}

  configure(consumer: MiddlewareConsumer) {
    const sessionOptions: session.SessionOptions = {
      name: 'sid',
      secret: process.env.SESSION_SECRET!,
      resave: false,
      saveUninitialized: false,
      rolling: true,
      cookie: this.authService.getSessionCookieOptions(),
    };

    if (process.env.REDIS_URL) {
      const redis = createClient({ url: process.env.REDIS_URL });
      redis.connect().catch(console.error);

      sessionOptions.store = new RedisStore({
        client: redis,
        prefix: 'sess:',
      });
    }

    const { doubleCsrfProtection } = this.authService.createDoubleCsrfConfig();

    consumer.apply(session(sessionOptions), cookieParser()).forRoutes('*');

    consumer
      .apply((req: any, res: any, next: any) => {
        doubleCsrfProtection(req, res, (err?: any) => {
          if (err?.code === 'EBADCSRFTOKEN') {
            return res
              .status(403)
              .json({ message: 'CSRF token missing or invalid' });
          }
          return next(err);
        });
      })
      .exclude(
        { path: 'auth/login', method: RequestMethod.POST },
        { path: 'auth/register', method: RequestMethod.POST },
        { path: 'csrf-token', method: RequestMethod.GET },
      )
      .forRoutes('*');
  }
}
