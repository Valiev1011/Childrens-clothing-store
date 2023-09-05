import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'John', description: 'User first name' })
  @IsNotEmpty()
  @IsString()
  first_name: string;

  @ApiProperty({ example: 'Doe', description: 'User last name' })
  @IsNotEmpty()
  @IsString()
  last_name: string;

  @ApiProperty({
    example: '1234567890',
    description: 'User phone number',
  })
  @IsNotEmpty()
  @IsString()
  phone_number: string;

  @ApiProperty({
    example: 'user@example.com',
    description: 'User email',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'password',
    description: 'User password',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;
}
