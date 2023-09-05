import { forwardRef, Module } from '@nestjs/common';
import { SessionCartService } from './session_cart.service';
import { SessionCartController } from './session_cart.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { SessionCart } from './model/session_cart.model';
import { ProductModule } from '../product/product.module';
import { SessionModule } from '../session/session.module';
import { Session } from '../session/model/session.model';
import { Product } from '../product/model/product.model';

@Module({
  imports: [
    SequelizeModule.forFeature([SessionCart,Session,Product]),
    // forwardRef(() => ProductModule),
    // forwardRef(() => SessionModule),
  ],
  controllers: [SessionCartController],
  providers: [SessionCartService],
  exports: [SessionCartService],
})
export class SessionCartModule {}
