import { forwardRef, Module } from '@nestjs/common';
import { SessionService } from './session.service';
import { SessionController } from './session.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Session } from './model/session.model';
import { SessionCartModule } from '../session_cart/session_cart.module';
import { SessionCart } from '../session_cart/model/session_cart.model';

@Module({
  imports: [
    SequelizeModule.forFeature([Session, SessionCart]),
    // forwardRef(() => SessionCartModule),
  ],
  controllers: [SessionController],
  providers: [SessionService],
  exports: [SessionService],
})
export class SessionModule {}
