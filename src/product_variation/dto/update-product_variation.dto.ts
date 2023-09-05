import { PartialType } from '@nestjs/swagger';
import { CreateProductVariationDto } from './create-product_variation.dto';

export class UpdateProductVariationDto extends PartialType(CreateProductVariationDto) {}
