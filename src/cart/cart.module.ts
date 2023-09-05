import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Cart } from './model/cart.model';
import { ZakazModule } from '../zakaz/zakaz.module';
import { AddressModule } from '../address/address.module';
import { OrderItemsModule } from '../order_items/order_items.module';
import { JwtModule } from '@nestjs/jwt';
import { CartItemsModule } from '../cart_items/cart_items.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Cart]),
    ZakazModule,
    AddressModule,
    CartModule,
    OrderItemsModule,
    JwtModule,
    CartItemsModule,
  ],
  controllers: [CartController],
  providers: [CartService],
  exports: [CartService],
})
export class CartModule {}
