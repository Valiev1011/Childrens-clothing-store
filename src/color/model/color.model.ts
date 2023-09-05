import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { ProductVariation } from '../../product_variation/model/product_variation.model';

interface ColorAttrs {
  name: string;
}

@Table({ tableName: 'color' })
export class Color extends Model<Color, ColorAttrs> {
  @ApiProperty({ example: 'Red', description: 'Color name' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @HasMany(() => ProductVariation)
  variation: ProductVariation[];
}
