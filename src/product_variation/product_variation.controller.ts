import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ProductVariationService } from './product_variation.service';
import { CreateProductVariationDto } from './dto/create-product_variation.dto';
import { UpdateProductVariationDto } from './dto/update-product_variation.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '../guards/jwt.guard';
import { AdminGuard } from '../guards/admin.guard';

@Controller('product-variation')
@UseGuards(JwtGuard, AdminGuard)
@ApiTags('Product Variation')
export class ProductVariationController {
  constructor(
    private readonly productVariationService: ProductVariationService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new product variation' })
  create(@Body() createProductVariationDto: CreateProductVariationDto) {
    return this.productVariationService.create(createProductVariationDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get a list of all product variations' })
  findAll() {
    return this.productVariationService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a product variation by ID' })
  findOne(@Param('id') id: string) {
    return this.productVariationService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a product variation by ID' })
  update(
    @Param('id') id: string,
    @Body() updateProductVariationDto: UpdateProductVariationDto,
  ) {
    return this.productVariationService.update(+id, updateProductVariationDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a product variation by ID' })
  remove(@Param('id') id: string) {
    return this.productVariationService.delete(+id);
  }
}
