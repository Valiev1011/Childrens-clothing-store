import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Product } from '../product/model/product.model';
import { ProductCategory } from '../product_category/model/product_category.model';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './model/category.model'; // Assuming you have a Category model

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category)
    private categoryRepository: typeof Category,
  ) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const category = await this.categoryRepository.create(createCategoryDto);
    return category;
  }

  async findAll(): Promise<Category[]> {
    const categories = await this.categoryRepository.findAll({
      include: { all: true },
    });
    return categories;
  }

  async findOne(id: number): Promise<Category> {
    const category = await this.categoryRepository.findOne({
      where: { id },
      include: [
        {
          model: Product,
          attributes: {
            exclude: ['createdAt', 'updatedAt', 'ProductCategory'],
          },
          // include: [
          //   {
          //     model: ProductCategory,
          //     attributes: {
          //       exclude: ['createdAt', 'updatedAt', 'ProductCategory'],
          //     },
          //   },
          // ],
        },
      ],
    });
    return category;
  }

  async update(
    id: number,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<[number, Category[]]> {
    const updatedCategories = await this.categoryRepository.update(
      updateCategoryDto,
      { where: { id }, returning: true },
    );
    return updatedCategories;
  }

  async remove(id: number): Promise<number> {
    const deletedCategories = await this.categoryRepository.destroy({
      where: { id },
    });
    return deletedCategories;
  }
}
