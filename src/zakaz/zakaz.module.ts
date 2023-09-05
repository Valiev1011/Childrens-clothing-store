import { Module } from '@nestjs/common';
import { ZakazService } from './zakaz.service';
import { ZakazController } from './zakaz.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Zakaz } from './model/zakaz.model';

@Module({
  imports: [SequelizeModule.forFeature([Zakaz])],
  controllers: [ZakazController],
  providers: [ZakazService],
  exports: [ZakazService],
})
export class ZakazModule {}
