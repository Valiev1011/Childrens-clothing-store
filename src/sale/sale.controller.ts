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
import { SaleService } from './sale.service';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger'; // Import the necessary Swagger decorators
import { JwtGuard } from '../guards/jwt.guard';
import { AdminGuard } from '../guards/admin.guard';

@ApiTags('Sale')
@UseGuards(JwtGuard, AdminGuard)
@Controller('sale')
export class SaleController {
  constructor(private readonly saleService: SaleService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new sale' }) // Add @ApiOperation with a summary
  create(@Body() createSaleDto: CreateSaleDto) {
    return this.saleService.create(createSaleDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all sales' }) // Add @ApiOperation with a summary
  findAll() {
    return this.saleService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a sale by ID' }) // Add @ApiOperation with a summary
  findOne(@Param('id') id: string) {
    return this.saleService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a sale by ID' }) // Add @ApiOperation with a summary
  update(@Param('id') id: string, @Body() updateSaleDto: UpdateSaleDto) {
    return this.saleService.update(+id, updateSaleDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a sale by ID' }) // Add @ApiOperation with a summary
  remove(@Param('id') id: string) {
    return this.saleService.remove(+id);
  }
}
