import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthController } from './auth.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RefreshJwtStrategy } from './strategies/refresh-jwt.strategy';
import { StringValue } from '../types/types';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: (configService.get<string>('JWT_EXPIRATION') ||
            '1h') as StringValue,
        },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UserService,
    LocalStrategy,
    JwtStrategy,
    RefreshJwtStrategy,
  ],
  exports: [AuthService],
})
export class AuthModule {}
