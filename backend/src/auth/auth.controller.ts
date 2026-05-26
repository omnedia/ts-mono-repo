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
import {
  ApiBody,
  ApiCookieAuth,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Request as ERequest, Response as EResponse } from 'express';
import { AuthRequest } from '../types/user.types';
import { AuthService } from './auth.service';
import { ChangePasswordDto } from './dto/change-password.dto';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { SessionAuthGuard } from './guards/session-auth.guard';
import { UserService } from './user.service';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Get('csrf')
  @ApiOperation({ summary: 'Get csrfToken for current session' })
  @ApiOkResponse({
    schema: {
      type: 'object',
      properties: {
        csrfToken: { type: 'string' },
      },
      required: ['csrfToken'],
    },
  })
  @ApiCookieAuth()
  getCsrf(@Req() req: ERequest, @Res({ passthrough: true }) res: EResponse) {
    const csrfToken = this.authService.createDoubleCsrfConfig().generateCsrfToken(req, res);
    return { csrfToken };
  }

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiBody({ type: RegisterDto })
  @ApiCreatedResponse({ type: UserResponseDto })
  async register(@Body() body: RegisterDto): Promise<UserResponseDto> {
    return this.userService.create(body.email, body.password);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(204)
  @ApiOperation({ summary: 'Log in a user' })
  @ApiBody({ type: LoginDto })
  @ApiNoContentResponse()
  login(@Request() req: AuthRequest, @Body() body: LoginDto): Promise<void> {
    return this.authService.login(req, body.staySignedIn ?? false);
  }

  @HttpCode(204)
  @Post('logout')
  @ApiOperation({ summary: 'Log out a user' })
  @ApiCookieAuth()
  @ApiNoContentResponse()
  logout(@Req() req: ERequest): Promise<void> {
    return this.authService.logout(req);
  }

  @UseGuards(SessionAuthGuard)
  @Get('user')
  @ApiOperation({ summary: 'Get the current User (Authenticated)' })
  @ApiOkResponse({
    description: 'Returns User Entity',
    type: UserResponseDto,
  })
  async getCurrentUser(@Request() req: AuthRequest): Promise<UserResponseDto> {
    return await this.userService.findOne(req.user.email);
  }

  @UseGuards(SessionAuthGuard)
  @Put('change-password')
  @ApiCookieAuth()
  @ApiOperation({
    summary: 'Change the password of the current User (Authenticated)',
  })
  @ApiBody({ type: ChangePasswordDto })
  @ApiNoContentResponse()
  changeUserPassword(@Request() req: AuthRequest, @Body() body: ChangePasswordDto): Promise<void> {
    return this.userService.changePassword(req.user, body.password);
  }
}
