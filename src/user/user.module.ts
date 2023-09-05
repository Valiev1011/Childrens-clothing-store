import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './model/user.model';
import { JwtModule } from '@nestjs/jwt';
import { MailModule } from '../mail/mail.module';
import { RedisService } from '../redis/redis.service';
import { RedisModule } from '../redis/redis.module';
import { CartModule } from '../cart/cart.module';
import { SessionModule } from '../session/session.module';
import { SessionCartModule } from '../session_cart/session_cart.module';
import { CartItemsModule } from '../cart_items/cart_items.module';

@Module({
  imports: [
    SequelizeModule.forFeature([User]),
    JwtModule.register({}),
    MailModule,
    RedisModule,
    CartModule,
    forwardRef(() => SessionModule),
    forwardRef(() => SessionCartModule),
    CartItemsModule,
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
