import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateProductCategoryDto } from './dto/create-product_category.dto';
import { UpdateProductCategoryDto } from './dto/update-product_category.dto';
import { ProductCategory } from './model/product_category.model';

@Injectable()
export class ProductCategoryService {
  constructor(
    @InjectModel(ProductCategory)
    private productCategoryRepository: typeof ProductCategory,
  ) {}

  async create(
    createProductCategoryDto: CreateProductCategoryDto,
  ): Promise<ProductCategory> {
    const productCategory = await this.productCategoryRepository.create(
      createProductCategoryDto,
    );
    return productCategory;
  }

  async findAll(): Promise<ProductCategory[]> {
    const productCategories = await this.productCategoryRepository.findAll();
    return productCategories;
  }

  async findOne(id: number): Promise<ProductCategory> {
    const productCategory = await this.productCategoryRepository.findOne({
      where: { id },
    });
    return productCategory;
  }

  async update(
    id: number,
    updateProductCategoryDto: UpdateProductCategoryDto,
  ): Promise<[number, ProductCategory[]]> {
    const updatedProductCategories =
      await this.productCategoryRepository.update(updateProductCategoryDto, {
        where: { id },
        returning: true,
      });
    return updatedProductCategories;
  }

  async remove(id: number): Promise<number> {
    const deletedProductCategories =
      await this.productCategoryRepository.destroy({
        where: { id },
      });
    return deletedProductCategories;
  }
}
