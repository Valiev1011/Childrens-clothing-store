import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { ProductVariation } from '../../product_variation/model/product_variation.model';

interface SizeAttrs {
  name: string;
}

@Table({ tableName: 'size' })
export class Size extends Model<Size, SizeAttrs> {
  @ApiProperty({ example: '0-1,1-3', description: 'size description' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @HasMany(() => ProductVariation)
  variation: ProductVariation[];
}
