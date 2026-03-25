import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class ChangePasswordDto {
  @ApiProperty({
    example: 'newsecurepassword',
    description: 'New password for the user account',
  })
  @IsString()
  @MinLength(6)
  password: string;
}
