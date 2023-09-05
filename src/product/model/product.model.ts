import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsToMany,
  Column,
  DataType,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { CartItem } from '../../cart_items/model/cart_item.model';
import { Category } from '../../category/model/category.model';
import { OrderItem } from '../../order_items/model/order_item.model';
import { ProductCategory } from '../../product_category/model/product_category.model';
import { ProductVariation } from '../../product_variation/model/product_variation.model';
import { Review } from '../../review/model/review.model';
import { Sale } from '../../sale/model/sale.model';

interface ProductAttrs {
  name: string;
  description: string;
  price: number;
  brand: string;
  ratings: number;
}

@Table({ tableName: 'products' })
export class Product extends Model<Product, ProductAttrs> {
  @ApiProperty({ example: 1, description: 'Unique ID' })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'Product Name', description: 'Name of the product' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @ApiProperty({
    example: 'Product description',
    description: 'Description of the product',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  description: string;

  @ApiProperty({ example: 29.99, description: 'Price of the product' })
  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
  })
  price: number;

  @ApiProperty({ example: 'Brand Name', description: 'Brand of the product' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  brand: string;

  @ApiProperty({ example: 4.5, description: 'Ratings of the product' })
  @Column({
    type: DataType.FLOAT,
  })
  ratings: number;

  @BelongsToMany(() => Category, () => ProductCategory)
  category: Category[];

  @HasMany(() => Sale)
  sale: Sale[];

  @HasMany(() => ProductVariation)
  variation: ProductVariation[];

  @HasMany(() => CartItem)
  cartItem: CartItem[];

  @HasMany(() => Review)
  review: Review[];

  @HasMany(() => OrderItem)
  order_items: OrderItem[];
}
