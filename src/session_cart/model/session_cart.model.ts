import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Cart } from '../../cart/model/cart.model';
import { Product } from '../../product/model/product.model';
import { Session } from '../../session/model/session.model';

interface SessionCartAttrs {
  session_id: string;
  product_id: number;
  quantity: number;
  subtotal: number;
}

@Table({ tableName: 'session_cart' })
export class SessionCart extends Model<SessionCart, SessionCartAttrs> {
  @ApiProperty({ example: 1, description: 'Unique ID' })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 1, description: 'Cart ID' })
  @ForeignKey(() => Session)
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  session_id: string;

  @BelongsTo(() => Session)
  sessions: Session;

  @ApiProperty({ example: 1, description: 'Product ID' })
  @ForeignKey(() => Product)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  product_id: number;

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
