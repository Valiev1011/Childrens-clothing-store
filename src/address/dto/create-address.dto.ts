import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateAddressDto {
  @ApiProperty({ example: 1, description: 'User ID' })
  // @IsNotEmpty()
  user_id: number;

  @ApiProperty({ example: '123 Main St', description: 'Street address' })
  @IsNotEmpty()
  @IsString()
  street: string;

  @ApiProperty({ example: 'Cityville', description: 'City' })
  @IsNotEmpty()
  @IsString()
  city: string;

  @ApiProperty({ example: '12345', description: 'ZIP Code' })
  @IsNotEmpty()
  @IsString()
  zip_code: string;

  @ApiProperty({
    example: '123-456-7890',
    description: 'Phone Number',
    required: false,
  })
  @IsOptional()
  @IsString()
  phone_number?: string;
}
