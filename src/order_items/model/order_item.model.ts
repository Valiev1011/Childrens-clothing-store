import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Product } from '../../product/model/product.model';
import { Zakaz } from '../../zakaz/model/zakaz.model';

interface OrderItemAttrs {
  orderId: number;
  productId: number;
  quantity: number;
  subtotal: number;
}

@Table({ tableName: 'order_items' })
export class OrderItem extends Model<OrderItem, OrderItemAttrs> {
  @ApiProperty({ example: 1, description: 'Unique ID' })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 1, description: 'Order ID' })
  @ForeignKey(() => Zakaz)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  orderId: number;

  @BelongsTo(() => Zakaz)
  order: Zakaz;

  @ApiProperty({ example: 1, description: 'Product ID' })
  @ForeignKey(() => Product)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  productId: number;

  @BelongsTo(() => Product)
  product: Product;

  @ApiProperty({ example: 3, description: 'Quantity' })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  quantity: number;

  @ApiProperty({ example: 89.97, description: 'Subtotal' })
  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
  })
  subtotal: number;
}
