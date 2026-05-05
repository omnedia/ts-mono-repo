import { NestFactory } from '@nestjs/core';
import type { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as dotenv from 'dotenv';
import { AppModule } from './app.module';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.set('trust proxy', 1);

  const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || 'http://localhost:4200';

  app.enableCors({
    origin: allowedOrigins,
    methods: 'GET,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: ['Content-Type', 'Authorization', 'X-CSRF-Token'],
    credentials: true,
    preflightContinue: false,
  });

  if (process.env.NODE_ENV !== 'prod') {
    const config = new DocumentBuilder()
      .setTitle('API Documentation')
      .setDescription(
        `
## Authentication Flow

This API uses **session-based authentication** with CSRF protection:

1. **Login**: POST to \`/auth/login\` with your credentials
2. **Get CSRF Token**: GET \`/auth/csrf\` to obtain your CSRF token
3. **Access Protected Routes**: Include the CSRF token in the \`X-CSRF-Token\` header for all subsequent requests

The session cookie (\`sid\`) is automatically managed by your HTTP client.`,
      )
      .setVersion('1.0')
      .addCookieAuth(
        'sid',
        {
          type: 'apiKey',
          in: 'cookie',
          name: 'sid',
        },
        'sid',
      )
      .addApiKey(
        {
          type: 'apiKey',
          in: 'header',
          name: 'X-CSRF-Token',
          description: 'CSRF token for session-bound requests',
        },
        'csrf',
      )
      .build();

    const document = SwaggerModule.createDocument(app, config, {
      operationIdFactory: (_controllerKey: string, methodKey: string) => methodKey,
    });
    SwaggerModule.setup('api', app, document);
  }

  await app.listen(process.env.PORT ?? 3000);
}

void bootstrap();
