import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
  HasMany,
  BelongsTo,
} from 'sequelize-typescript';
import { Address } from '../../address/model/address.model';
import { OrderItem } from '../../order_items/model/order_item.model';
import { Payment } from '../../payment/model/payment.model';
import { User } from '../../user/model/user.model';

interface ZakazAttrs {
  user_id: number;
  order_date: Date;
  order_status: string;
  total_amount: number;
  shipping_address: number;
}

@Table({ tableName: 'zakaz' })
export class Zakaz extends Model<Zakaz, ZakazAttrs> {
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

  @ApiProperty({ example: '2023-08-31', description: 'Order date' })
  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  order_date: Date;

  @ApiProperty({ example: 'Processing', description: 'Order status' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  order_status: string;

  @ApiProperty({ example: 100.5, description: 'Total amount' })
  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
  })
  total_amount: number;

  @ApiProperty({ example: '123 Shipping St', description: 'Shipping address' })
  @ForeignKey(() => Address)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  shipping_address: number;

  @BelongsTo(() => Address)
  address: Address;

  // Define the association with OrderItem
  @HasMany(() => OrderItem)
  order_items: OrderItem[];
}
