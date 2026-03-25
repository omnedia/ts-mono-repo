import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsOptional, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    example: 'test@test.test',
    description: 'Email address of the user',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'securepassword',
    description: 'Password for the user account',
  })
  @IsString()
  password: string;

  @ApiProperty({
    example: true,
    description: 'Whether to keep the user signed in',
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  staySignedIn?: boolean;
}
