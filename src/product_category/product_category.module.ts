import { Module } from '@nestjs/common';
import { ProductCategoryService } from './product_category.service';
import { ProductCategoryController } from './product_category.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProductCategory } from './model/product_category.model';

@Module({
  imports: [SequelizeModule.forFeature([ProductCategory])],
  controllers: [ProductCategoryController],
  providers: [ProductCategoryService],
})
export class ProductCategoryModule {}
