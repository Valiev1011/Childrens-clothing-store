import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from '../../user/model/user.model';

interface AddressAttrs {
  user_id: number;
  street: string;
  city: string;
  zip_code: string;
  phone_number: string;
}

@Table({ tableName: 'address' })
export class Address extends Model<Address, AddressAttrs> {
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

  @BelongsTo(() => User)
  user: User;

  @ApiProperty({ example: '123 Street', description: 'Street' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  street: string;

  @ApiProperty({ example: 'City', description: 'City' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  city: string;

  @ApiProperty({ example: '12345', description: 'Zip Code' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  zip_code: string;

  @ApiProperty({ example: '123-456-7890', description: 'Phone Number' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  phone_number: string;
}
