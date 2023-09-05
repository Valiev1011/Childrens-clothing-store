import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsInt } from 'class-validator';

export class CreateProductCategoryDto {
  @ApiProperty({ example: 1, description: 'Product ID' })
  @IsNotEmpty()
  @IsInt()
  product_id: number;

  @ApiProperty({ example: 1, description: 'Category ID' })
  @IsNotEmpty()
  @IsInt()
  category_id: number;
}
