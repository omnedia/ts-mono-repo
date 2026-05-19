import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { DatabaseModule } from '../database/database.module';
import { UserRepository } from '../entities/user/user.repository';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { SessionAuthGuard } from './guards/session-auth.guard';
import { LocalStrategy } from './strategies/local.strategy';
import { UserService } from './user.service';

@Module({
  imports: [DatabaseModule, PassportModule],
  controllers: [AuthController],
  providers: [AuthService, UserService, UserRepository, LocalStrategy, SessionAuthGuard],
  exports: [AuthService],
})
export class AuthModule {}
