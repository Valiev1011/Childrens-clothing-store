import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from '../../user/model/user.model';
import { Product } from '../../product/model/product.model';

interface ReviewAttrs {
  user_id: number;
  product_id: number;
  rating: number;
  review_text: string;
}

@Table({ tableName: 'review' })
export class Review extends Model<Review, ReviewAttrs> {
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

  @ApiProperty({ example: 1, description: 'Product ID' })
  @ForeignKey(() => Product)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  product_id: number;

  @ApiProperty({ example: 4.5, description: 'Rating' })
  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  rating: number;

  @ApiProperty({
    example: 'This product is amazing!',
    description: 'Review text',
  })
  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  review_text: string;
}
