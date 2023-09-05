import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateAdminDto {
  @ApiProperty({ example: 'John', description: 'Admin first name' })
  @IsNotEmpty()
  @IsString()
  first_name: string;

  @ApiProperty({ example: 'Doe', description: 'Admin last name' })
  @IsNotEmpty()
  @IsString()
  last_name: string;

  @ApiProperty({
    example: '1234567890',
    description: 'Admin phone number',
  })
  @IsNotEmpty()
  @IsString()
  phone_number: string;

  @ApiProperty({
    example: 'admin@example.com',
    description: 'Admin email',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'password',
    description: 'Admin password',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;
}
