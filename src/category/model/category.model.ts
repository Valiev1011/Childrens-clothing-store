import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsToMany,
  Column,
  DataType,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Product } from '../../product/model/product.model';
import { ProductCategory } from '../../product_category/model/product_category.model';
import { Sale } from '../../sale/model/sale.model';

interface CategoryAttrs {
  name: string;
  description: string;
}

@Table({ tableName: 'category' })
export class Category extends Model<Category, CategoryAttrs> {
  @ApiProperty({ example: 1, description: 'Unique ID' })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'Electronics', description: 'Category name' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @ApiProperty({
    example: 'Electronic devices and gadgets',
    description: 'Category description',
  })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  description: string;

  @BelongsToMany(() => Product, () => ProductCategory)
  product: Product[];

  @HasMany(() => Sale)
  sale: Sale[];
}
