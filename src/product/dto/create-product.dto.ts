import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, Min, Max } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ example: 'Product Name', description: 'Name of the product' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    example: 'Product description',
    description: 'Description of the product',
  })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({ example: 29.99, description: 'Price of the product' })
  @IsNotEmpty()
  @IsNumber()
  @Min(0.01)
  price: number;

  @ApiProperty({ example: 'Brand Name', description: 'Brand of the product' })
  @IsNotEmpty()
  @IsString()
  brand: string;
}
