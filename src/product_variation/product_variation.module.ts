import { Module } from '@nestjs/common';
import { ProductVariationService } from './product_variation.service';
import { ProductVariationController } from './product_variation.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProductVariation } from './model/product_variation.model';

@Module({
  imports: [SequelizeModule.forFeature([ProductVariation])],
  controllers: [ProductVariationController],
  providers: [ProductVariationService],
})
export class ProductVariationModule {}
