import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsDateString } from 'class-validator';

export class CreateCartDto {
  @ApiProperty({ example: 1, description: 'User ID' })
  @IsNotEmpty()
  @IsNumber()
  user_id: number;

  // @ApiProperty({
  //   example: '2023-08-29T10:00:00Z',
  //   description: 'Date the cart was created',
  // })
  // @IsNotEmpty()
  // @IsDateString()
  // created_at: Date;

  // @ApiProperty({
  //   example: '2023-08-29T12:30:00Z',
  //   description: 'Date the cart was last updated',
  // })
  // @IsNotEmpty()
  // @IsDateString()
  // last_updated: Date;
}
