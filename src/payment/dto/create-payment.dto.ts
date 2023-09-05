import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsDate,
  IsEnum,
  IsDateString,
  Validate,
} from 'class-validator';
import { CheckUserIdValidator } from './check-orderid.validator';
import { CheckOrderIdValidator } from './check-userid.validator';

export class CreatePaymentDto {
  @ApiProperty({ example: 1, description: 'User ID' })
  @IsNotEmpty()
  @IsNumber()
  @Validate(CheckUserIdValidator, { message: 'User ID not found' })
  readonly user_id: number;

  @ApiProperty({ example: 1, description: 'Order ID' })
  @IsNotEmpty()
  @IsNumber()
  @Validate(CheckOrderIdValidator, { message: 'Order ID not found' })
  readonly order_id: number;

  @ApiProperty({ example: '2023-08-28', description: 'Payment Date' })
  @IsNotEmpty()
  @IsDateString()
  readonly payment_date: Date;

  @ApiProperty({ example: 100.0, description: 'Total Amount' })
  @IsNotEmpty()
  @IsNumber()
  readonly total_amount: number;

  @ApiProperty({ example: 'Credit Card', description: 'Payment Method' })
  @IsNotEmpty()
  @IsString()
  readonly payment_method: string;

  @ApiProperty({ example: 'Paid', description: 'Payment Status' })
  @IsNotEmpty()
  @IsEnum(['Paid', 'Pending', 'Failed']) // Define the possible payment statuses
  readonly payment_status: string;
}
