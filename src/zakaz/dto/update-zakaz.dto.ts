import { PartialType } from '@nestjs/swagger';
import { CreateZakazDto } from './create-zakaz.dto';

export class UpdateZakazDto extends PartialType(CreateZakazDto) {}
