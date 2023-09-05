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
import { ColorService } from './color.service';
import { CreateColorDto } from './dto/create-color.dto';
import { UpdateColorDto } from './dto/update-color.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '../guards/jwt.guard';
import { AdminGuard } from '../guards/admin.guard';

@Controller('color')
@UseGuards(JwtGuard, AdminGuard)
@ApiTags('Color')
export class ColorController {
  constructor(private readonly colorService: ColorService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new color' })
  create(@Body() createColorDto: CreateColorDto) {
    return this.colorService.create(createColorDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all colors' })
  findAll() {
    return this.colorService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a color by ID' })
  findOne(@Param('id') id: string) {
    return this.colorService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a color by ID' })
  update(@Param('id') id: string, @Body() updateColorDto: UpdateColorDto) {
    return this.colorService.update(+id, updateColorDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a color by ID' })
  remove(@Param('id') id: string) {
    return this.colorService.remove(+id);
  }
}
