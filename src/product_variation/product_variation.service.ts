import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateProductVariationDto } from './dto/create-product_variation.dto';
import { UpdateProductVariationDto } from './dto/update-product_variation.dto';
import { ProductVariation } from './model/product_variation.model';

@Injectable()
export class ProductVariationService {
  constructor(
    @InjectModel(ProductVariation)
    private productVariationRepository: typeof ProductVariation,
  ) {}

  async create(
    createProductVariationDto: CreateProductVariationDto,
  ): Promise<ProductVariation> {
    const productVariation = await this.productVariationRepository.create(
      createProductVariationDto,
    );
    return productVariation;
  }

  async findAll(): Promise<ProductVariation[]> {
    const productVariations = await this.productVariationRepository.findAll({
      include: { all: true }, // Include related models as needed
    });
    return productVariations;
  }

  async findOne(id: number): Promise<ProductVariation> {
    const productVariation = await this.productVariationRepository.findOne({
      where: { id },
    });
    return productVariation;
  }

  async update(
    id: number,
    updateProductVariationDto: UpdateProductVariationDto,
  ): Promise<[number, ProductVariation[]]> {
    const updatedProductVariations =
      await this.productVariationRepository.update(updateProductVariationDto, {
        where: { id },
        returning: true,
      });
    return updatedProductVariations;
  }

  async delete(id: number): Promise<number> {
    const deletedProductVariations =
      await this.productVariationRepository.destroy({
        where: { id },
      });
    return deletedProductVariations;
  }
}
