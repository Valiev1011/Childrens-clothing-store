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
import { Category } from '../../category/model/category.model';

interface ProductCategoryAttrs {
  product_id: number;
  category_id: number;
}

@Table({ tableName: 'product_category' })
export class ProductCategory extends Model<
  ProductCategory,
  ProductCategoryAttrs
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

  @ApiProperty({ example: 1, description: 'Category ID' })
  @ForeignKey(() => Category)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  category_id: number;

  @BelongsTo(() => Category)
  category: Category;
}
