import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Product } from './model/product.model';
import { JwtModule } from '@nestjs/jwt';
// import { MailModule } from '../mail/mail.module';

@Module({
  imports: [SequelizeModule.forFeature([Product]), JwtModule.register({})],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductModule {}
