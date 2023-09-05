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
import { Color } from '../../color/model/color.model';
import { Size } from '../../size/model/size.model';

interface ProductVariationAttr {
  product_id: number;
  color_id: number;
  size_id: number;
  stock_quantity: number;
  price_adjustment: number;
}

@Table({ tableName: 'product_variation' })
export class ProductVariation extends Model<
  ProductVariation,
  ProductVariationAttr
> {
  @ApiProperty({ example: 1, description: 'Unique ID' })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 1, description: 'Product ID' })
  @ForeignKey(() => Product)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  product_id: number;

  @BelongsTo(() => Product)
  product: Product;

  @ApiProperty({ example: 1, description: 'Color ID' })
  @ForeignKey(() => Color)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  color_id: number;

  @BelongsTo(() => Color)
  color: Color;

  @ApiProperty({ example: 1, description: 'Size ID' })
  @ForeignKey(() => Size)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  size_id: number;

  @BelongsTo(() => Size)
  size: Size;

  @ApiProperty({ example: 50, description: 'Stock Quantity' })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  stock_quantity: number;

  @ApiProperty({ example: -5, description: 'Price Adjustment' })
  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
  })
  price_adjustment: number;
}
