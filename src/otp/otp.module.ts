import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { OTP } from './models/otp.model';

@Module({
  imports: [SequelizeModule.forFeature([OTP])],
})
export class OtpModule {}
