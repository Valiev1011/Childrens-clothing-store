import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class CreateProductVariationDto {
  @ApiProperty({ example: 1, description: 'Product ID' })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  product_id: number;

  @ApiProperty({ example: 1, description: 'Color ID' })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  color_id: number;

  @ApiProperty({ example: 1, description: 'Size ID' })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  size_id: number;

  @ApiProperty({ example: 10, description: 'Stock Quantity' })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  stock_quantity: number;

  @ApiProperty({ example: 50.0, description: 'Price Adjustment' })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  price_adjustment: number;
}
