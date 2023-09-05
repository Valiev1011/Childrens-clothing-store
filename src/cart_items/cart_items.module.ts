import { Module } from '@nestjs/common';
import { CartItemsService } from './cart_items.service';
import { CartItemsController } from './cart_items.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { CartItem } from './model/cart_item.model';
import { ZakazModule } from '../zakaz/zakaz.module';
import { AddressModule } from '../address/address.module';
import { CartModule } from '../cart/cart.module';
import { OrderItemsModule } from '../order_items/order_items.module';
import { JwtModule } from '@nestjs/jwt';
import { ProductModule } from '../product/product.module';

@Module({
  imports: [
    SequelizeModule.forFeature([CartItem]),
    ZakazModule,
    AddressModule,
    OrderItemsModule,
    JwtModule,
    ProductModule
  ],
  controllers: [CartItemsController],
  providers: [CartItemsService],
  exports: [CartItemsService],
})
export class CartItemsModule {}
