import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class CreateSessionCartDto {

  @ApiProperty({ example: 2, description: 'Product ID' })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  product_id: number;

  @ApiProperty({ example: 3, description: 'Quantity' })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  quantity: number;
}
