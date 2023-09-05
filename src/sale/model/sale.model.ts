import { ApiProperty } from '@nestjs/swagger';

import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Category } from '../../category/model/category.model';
import { Product } from '../../product/model/product.model';

interface SaleAttrs {
  name: string;
  start_date: Date;
  end_date: Date;
  discount_value: number;
  min_order_amount: number;
  status: string;
  related_category: number;
  related_products: number;
}

@Table({ tableName: 'sale' })
export class Sale extends Model<Sale, SaleAttrs> {
  @ApiProperty({ example: 1, description: 'Unique ID' })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'Summer Sale', description: 'Sale name' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @ApiProperty({ example: '2023-09-01', description: 'Start date of the sale' })
  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  start_date: Date;

  @ApiProperty({ example: '2023-09-15', description: 'End date of the sale' })
  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  end_date: Date;

  @ApiProperty({ example: 10, description: 'Discount value in percentage' })
  @Column({
    type: DataType.DECIMAL(5, 2),
    allowNull: false,
  })
  discount_value: number;

  @ApiProperty({
    example: 50,
    description: 'Minimum order amount for the discount',
  })
  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
  })
  min_order_amount: number;

  @ApiProperty({
    example: 'active',
    description: 'Status of the sale (e.g., active, expired)',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  status: string;

  @ApiProperty({ example: [1, 2, 3], description: 'Related category name' })
  @ForeignKey(() => Category)
  @Column({
    type: DataType.INTEGER,
  })
  related_category: number;

  @BelongsTo(() => Category)
  Category: Category;

  @ApiProperty({ example: [1, 2, 3], description: 'Related product name' })
  @ForeignKey(() => Product)
  @Column({
    type: DataType.INTEGER,
  })
  related_products: number;

  @BelongsTo(() => Product)
  Product: Product;
}
