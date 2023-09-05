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
import { ProductCategoryService } from './product_category.service';
import { CreateProductCategoryDto } from './dto/create-product_category.dto';
import { UpdateProductCategoryDto } from './dto/update-product_category.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '../guards/jwt.guard';
import { AdminGuard } from '../guards/admin.guard';

@Controller('product-category')
@UseGuards(JwtGuard, AdminGuard)
@ApiTags('Product Categories')
export class ProductCategoryController {
  constructor(
    private readonly productCategoryService: ProductCategoryService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new product category' })
  create(@Body() createProductCategoryDto: CreateProductCategoryDto) {
    return this.productCategoryService.create(createProductCategoryDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all product categories' })
  findAll() {
    return this.productCategoryService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a product category by ID' })
  findOne(@Param('id') id: string) {
    return this.productCategoryService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a product category by ID' })
  update(
    @Param('id') id: string,
    @Body() updateProductCategoryDto: UpdateProductCategoryDto,
  ) {
    return this.productCategoryService.update(+id, updateProductCategoryDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a product category by ID' })
  remove(@Param('id') id: string) {
    return this.productCategoryService.remove(+id);
  }
}
