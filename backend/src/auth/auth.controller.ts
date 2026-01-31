import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Put,
  Req,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request as ERequest, Response as EResponse } from 'express';
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { ApiBody, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { User } from '../entities/user.entity';
import { AuthRequest, SessionUser } from '../types/types';
import { SessionAuthGuard } from './guards/session-auth.guard';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Get('csrf')
  @ApiOperation({ summary: 'Get csrfToken for current session' })
  csrf(@Req() req: ERequest, @Res() res: EResponse) {
    const csrfToken = this.authService
      .createDoubleCsrfConfig()
      .generateCsrfToken(req, res);
    return res.json({ csrfToken });
  }

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiBody({
    schema: {
      example: { email: 'test@test.test', password: 'securepassword' },
    },
  })
  async register(
    @Body() body: { email: string; password: string },
  ): Promise<User> {
    return this.userService.create(body.email, body.password);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(204)
  @ApiOperation({ summary: 'Log in a user' })
  @ApiBody({
    schema: {
      example: {
        email: 'test@test.test',
        password: 'securepassword',
        staySignedIn: true,
      },
    },
  })
  login(
    @Request() req: AuthRequest,
    @Body() body: { staySignedIn: boolean },
  ): Promise<void> {
    return this.authService.login(req, body.staySignedIn);
  }

  @HttpCode(204)
  @Post('logout')
  @ApiOperation({ summary: 'Log out a user' })
  logout(@Req() req: ERequest): Promise<void> {
    return this.authService.logout(req);
  }

  @UseGuards(SessionAuthGuard)
  @Get('user')
  @ApiOperation({ summary: 'Get the current User (Authenticated)' })
  @ApiOkResponse({
    description: 'Returns User Entity',
    type: User,
  })
  async getCurrentUser(@Request() req: AuthRequest): Promise<SessionUser> {
    const user = await this.userService.findOne(req.user.email);

    return {
      id: user.id,
      email: user.email,
      role: user.role,
    };
  }

  @UseGuards(SessionAuthGuard)
  @Put('change-password')
  @ApiOperation({
    summary: 'Change the password of the current User (Authenticated)',
  })
  changeUserPassword(
    @Request() req: AuthRequest,
    @Body() body: { password: string },
  ): Promise<void> {
    return this.userService.changePassword(req.user, body.password);
  }
}
