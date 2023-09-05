import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
  BelongsTo,
  HasMany,
  HasOne,
} from 'sequelize-typescript';
import { User } from '../../user/model/user.model';
import { Zakaz } from '../../zakaz/model/zakaz.model';

interface PaymentAttrs {
  user_id: number;
  order_id: number;
  payment_date: Date;
  total_amount: number;
  payment_method: string;
  payment_status: string;
}

@Table({ tableName: 'payment' })
export class Payment extends Model<Payment, PaymentAttrs> {
  @ApiProperty({ example: 1, description: 'Unique ID' })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 1, description: 'User ID' })
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  user_id: number;

  @BelongsTo(() => User)
  user: User;

  @ApiProperty({ example: 1, description: 'Order ID' })
  @ForeignKey(() => Zakaz)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  order_id: number;

  @BelongsTo(() => Zakaz)
  order: Zakaz;

  @ApiProperty({ example: '2023-08-31', description: 'Payment date' })
  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  payment_date: Date;

  @ApiProperty({ example: 100.5, description: 'Total amount' })
  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
  })
  total_amount: number;

  @ApiProperty({ example: 'Credit Card', description: 'Payment method' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  payment_method: string;

  @ApiProperty({ example: 'Paid', description: 'Payment status' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  payment_status: string;
}
