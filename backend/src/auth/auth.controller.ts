import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { RefreshJwtGuard } from './guards/refresh-jwt.guard';
import { User } from '../entities/user.entity';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { AuthRequest } from '../types/types';
import { IAuthResponse } from '@shared/interfaces';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

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
    @Request() req: { user: User },
    @Body() body: { staySignedIn: boolean },
  ): IAuthResponse {
    return this.authService.login(req.user, body.staySignedIn);
  }

  @UseGuards(RefreshJwtGuard)
  @ApiBearerAuth()
  @Post('refresh')
  @ApiOperation({ summary: 'Refresh access token using refresh token' })
  refreshToken(@Request() req: { user: User }): IAuthResponse {
    return this.authService.refreshToken(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('user')
  @ApiOperation({ summary: 'Get the current User (Authenticated)' })
  @ApiOkResponse({
    description: 'Returns User Entity',
    type: User,
  })
  async getCurrentUser(@Request() req: AuthRequest) {
    const user = await this.userService.findOne(req.user.email);

    return {
      id: user.id,
      email: user.email,
      role: user.role,
    };
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Put('change-password')
  @ApiOperation({
    summary: 'Change the password of the current User (Authenticated)',
  })
  changeUserPassword(
    @Request() req: { user: User },
    @Body() body: { password: string },
  ): Promise<void> {
    return this.userService.changePassword(req.user, body.password);
  }
}
