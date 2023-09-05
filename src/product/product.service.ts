import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

import { Product } from './model/product.model';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product)
    private productRepository: typeof Product,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const product = await this.productRepository.create(createProductDto);
    return product;
  }

  async findAll(): Promise<Product[]> {
    const products = await this.productRepository.findAll({
      include: { all: true },
    });
    return products;
  }

  async find(name: string): Promise<Product[]> {
    const products = await this.productRepository.findAll({
      where: { name: { [Op.iRegexp]: name } },
      include: { all: true },
    });

    return products;
  }


  async findOne(id: number): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { id },
    });
    return product.dataValues;
  }

  async update(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<[number, Product[]]> {
    const updatedProducts = await this.productRepository.update(
      updateProductDto,
      { where: { id }, returning: true },
    );
    return updatedProducts;
  }

  async delete(id: number): Promise<number> {
    const deletedProducts = await this.productRepository.destroy({
      where: { id },
    });
    return deletedProducts;
  }
}
