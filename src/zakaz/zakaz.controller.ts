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
import { ZakazService } from './zakaz.service';
import { CreateZakazDto } from './dto/create-zakaz.dto';
import { UpdateZakazDto } from './dto/update-zakaz.dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '../guards/jwt.guard';
import { AdminGuard } from '../guards/admin.guard';

@Controller('zakaz')
@UseGuards(JwtGuard)
@ApiTags('Order')
export class ZakazController {
  constructor(private readonly zakazService: ZakazService) {}

  @Post()
  create(@Body() createZakazDto: CreateZakazDto) {
    return this.zakazService.create(createZakazDto);
  }

  @UseGuards(AdminGuard)
  @Get()
  findAll() {
    return this.zakazService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.zakazService.findOne(+id);
  }

  @UseGuards(AdminGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateZakazDto: UpdateZakazDto) {
    return this.zakazService.update(+id, updateZakazDto);
  }

  @UseGuards(AdminGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.zakazService.remove(+id);
  }
}
