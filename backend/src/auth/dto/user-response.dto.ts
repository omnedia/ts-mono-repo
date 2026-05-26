import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../../types/user.types';

export class UserResponseDto {
  @ApiProperty({ example: 1, description: 'Unique identifier of the user' })
  id: number;

  @ApiProperty({
    example: 'test@test.test',
    description: 'Unique email for the user',
  })
  email: string;

  @ApiProperty({
    example: 'user',
    enum: UserRole,
    description: 'Role of the user',
  })
  role: UserRole;
}
