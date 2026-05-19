import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { MiddlewareModule } from './middleware.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), DatabaseModule, AuthModule, MiddlewareModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
