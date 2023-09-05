import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, Min, Max } from 'class-validator';

export class CreateReviewDto {
  @ApiProperty({ example: 1, description: 'User ID' })
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @ApiProperty({ example: 1, description: 'Product ID' })
  @IsNotEmpty()
  @IsNumber()
  productId: number;

  @ApiProperty({ example: 5, description: 'Rating (between 1 and 5)' })
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(5)
  rating: number;

  @ApiProperty({ example: 'Great product!', description: 'Review text' })
  @IsNotEmpty()
  @IsString()
  reviewText: string;
}
