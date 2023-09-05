import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Payment } from './model/payment.model';
import { ZakazModule } from '../zakaz/zakaz.module';
import { CheckOrderIdValidator } from './dto/check-userid.validator';
import { UserModule } from '../user/user.module';
import { CheckUserIdValidator } from './dto/check-orderid.validator';

@Module({
  imports: [SequelizeModule.forFeature([Payment]), ZakazModule, UserModule],
  controllers: [PaymentController],
  providers: [PaymentService, CheckOrderIdValidator, CheckUserIdValidator],
})
export class PaymentModule {}
