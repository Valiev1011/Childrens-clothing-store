import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import { MailModule } from './mail/mail.module';
import { Product } from './product/model/product.model';

import { ProductModule } from './product/product.module';
import { User } from './user/model/user.model';
import { UserModule } from './user/user.module';
import { AdminModule } from './admin/admin.module';
import { ZakazModule } from './zakaz/zakaz.module';
import { OrderItemsModule } from './order_items/order_items.module';
import { PaymentModule } from './payment/payment.module';
import { SessionModule } from './session/session.module';
import { AddressModule } from './address/address.module';
import { ReviewModule } from './review/review.module';
import { ColorModule } from './color/color.module';
import { SizeModule } from './size/size.module';
import { ProductVariationModule } from './product_variation/product_variation.module';
import { CategoryModule } from './category/category.module';
import { ProductCategoryModule } from './product_category/product_category.module';
import { SaleModule } from './sale/sale.module';
import { CartModule } from './cart/cart.module';
import { CartItemsModule } from './cart_items/cart_items.module';
import { SessionCartModule } from './session_cart/session_cart.module';
import { Address } from './address/model/address.model';
import { Admin } from './admin/model/admin.model';
import { Cart } from './cart/model/cart.model';
import { CartItem } from './cart_items/model/cart_item.model';
import { Category } from './category/model/category.model';
import { Color } from './color/model/color.model';
import { OrderItem } from './order_items/model/order_item.model';
import { Payment } from './payment/model/payment.model';
import { ProductCategory } from './product_category/model/product_category.model';
import { ProductVariation } from './product_variation/model/product_variation.model';
import { Review } from './review/model/review.model';
import { Sale } from './sale/model/sale.model';
import { Session } from './session/model/session.model';
import { SessionCart } from './session_cart/model/session_cart.model';
import { Size } from './size/model/size.model';
import { Zakaz } from './zakaz/model/zakaz.model';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    JwtModule.register({
      global: true,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: String(process.env.POSTGRES_PASSWORD),
      database: process.env.POSTGRES_DB,
      autoLoadModels: true,
      logging: false,
      models: [
        Product,
        User,
        Address,
        Admin,
        Cart,
        CartItem,
        Category,
        Color,
        OrderItem,
        Payment,
        ProductCategory,
        ProductVariation,
        Review,
        Sale,
        Session,
        SessionCart,
        Size,
        Zakaz,
      ],
    }),
    ProductModule,
    UserModule,
    MailModule,
    AdminModule,
    ZakazModule,
    OrderItemsModule,
    PaymentModule,
    SessionModule,
    AddressModule,
    ReviewModule,
    ColorModule,
    SizeModule,
    ProductVariationModule,
    CategoryModule,
    ProductCategoryModule,
    SaleModule,
    CartModule,
    CartItemsModule,
    SessionCartModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
