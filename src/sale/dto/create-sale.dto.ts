import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsPositive,
  IsDateString,
  IsOptional,
} from 'class-validator';

export class CreateSaleDto {
  @ApiProperty({ example: 'Summer Sale', description: 'Name of the sale' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: '2023-06-01', description: 'Start date of the sale' })
  @IsNotEmpty()
  @IsDateString()
  start_date: Date;

  @ApiProperty({ example: '2023-06-30', description: 'End date of the sale' })
  @IsNotEmpty()
  @IsDateString()
  end_date: Date;

  @ApiProperty({ example: 10, description: 'Discount value in percentage' })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  discount_value: number;

  @ApiProperty({
    example: 50.0,
    description: 'Minimum order amount to apply the discount',
  })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  min_order_amount: number;

  @ApiProperty({ example: 'active', description: 'Status of the sale' })
  @IsNotEmpty()
  @IsString()
  status: string;

  @ApiProperty({ example: [1, 2, 3], description: 'Related category' })
  @IsOptional()
  @IsNumber({}, { each: true })
  ralated_category: number[];

  @ApiProperty({ example: [1, 2, 3], description: 'Related category' })
  @IsOptional()
  @IsNumber({}, { each: true })
  ralated_product: number[];
}
