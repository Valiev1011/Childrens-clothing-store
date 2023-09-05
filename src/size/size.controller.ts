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
import { SizeService } from './size.service';
import { CreateSizeDto } from './dto/create-size.dto';
import { UpdateSizeDto } from './dto/update-size.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger'; // Import ApiOperation and ApiTags
import { JwtGuard } from '../guards/jwt.guard';
import { AdminGuard } from '../guards/admin.guard';

@Controller('size')
@UseGuards(JwtGuard, AdminGuard)
@ApiTags('Size')
export class SizeController {
  constructor(private readonly sizeService: SizeService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new size' }) // Add ApiOperation decorator with a summary
  create(@Body() createSizeDto: CreateSizeDto) {
    return this.sizeService.create(createSizeDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all sizes' }) // Add ApiOperation decorator with a summary
  findAll() {
    return this.sizeService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a size by ID' }) // Add ApiOperation decorator with a summary
  findOne(@Param('id') id: string) {
    return this.sizeService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a size by ID' }) // Add ApiOperation decorator with a summary
  update(@Param('id') id: string, @Body() updateSizeDto: UpdateSizeDto) {
    return this.sizeService.update(+id, updateSizeDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a size by ID' }) // Add ApiOperation decorator with a summary
  remove(@Param('id') id: string) {
    return this.sizeService.remove(+id);
  }
}
