import { Module } from '@nestjs/common';
import { OrderItemsService } from './order_items.service';
import { OrderItemsController } from './order_items.controller';
import { ConfigModule } from '@nestjs/config';
import { OrderItem } from './model/order_item.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { ZakazModule } from '../zakaz/zakaz.module';
import { CheckOrderIdValidator } from '../payment/dto/check-userid.validator';

@Module({
  imports: [SequelizeModule.forFeature([OrderItem]), ZakazModule],
  controllers: [OrderItemsController],
  providers: [OrderItemsService, CheckOrderIdValidator],
  exports: [OrderItemsService],
})
export class OrderItemsModule {}
