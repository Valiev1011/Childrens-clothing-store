import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  DataType,
  HasMany,
  HasOne,
  Model,
  Table,
} from 'sequelize-typescript';
import { Address } from '../../address/model/address.model';
import { Cart } from '../../cart/model/cart.model';
import { Payment } from '../../payment/model/payment.model';
import { Review } from '../../review/model/review.model';
import { Session } from '../../session/model/session.model';
import { Zakaz } from '../../zakaz/model/zakaz.model';

interface UserAttrs {
  first_name: string;
  last_name: string;
  phone_number: string;
  email: string;
  password: string;
  hashed_token: string;
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserAttrs> {
  @ApiProperty({ example: 1, description: 'Unique ID' })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'John', description: 'User first name' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  first_name: string;

  @ApiProperty({ example: 'Doe', description: 'User last name' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  last_name: string;

  @ApiProperty({
    example: '1234567890',
    description: 'User phone number',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  phone_number: string;

  @ApiProperty({
    example: 'user@example.com',
    description: 'User email',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  email: string;

  @ApiProperty({
    example: 'password',
    description: 'User password',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  is_active: boolean;

  @ApiProperty({
    example: 'hashed_token',
    description: 'User hashed token',
  })
  @Column({
    type: DataType.STRING,
  })
  hashed_token: string;

  @HasMany(() => Cart)
  carts: Cart[];

  @HasOne(() => Address)
  address: Address;

  @HasMany(() => Review)
  review: Review[];

  @HasMany(() => Payment)
  payment: Payment[];

  @HasMany(() => Zakaz)
  orders: Zakaz[];

  @HasMany(() => Session)
  session: Session[];
}
