import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface OTPAttribute {
  id: string;
  otp: string;
  expirationTime: Date;
  verified: boolean;
  check: string;
}

@Table({ tableName: 'otp' })
export class OTP extends Model<OTP, OTPAttribute> {
  @ApiProperty({
    example: 'qwaesfd-23wergds-qwedfwedf-qwere',
    description: 'unique otp id',
  })
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    allowNull: false,
  })
  id: string;

  @ApiProperty({
    example: '1234',
    description: 'otp value',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  otp: string;

  @ApiProperty({
    example: '2023-08-08T08:10:10.000Z',
    description: 'otp expiration time',
  })
  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  expirationTime: Date;

  @ApiProperty({
    example: false,
    description: 'otp verify status',
  })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  verified: boolean;

  @ApiProperty({
    example: '+998936996000',
    description: 'check phone number',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  check: string;
}
