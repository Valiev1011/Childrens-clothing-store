import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateColorDto {
  @ApiProperty({ example: 'Red', description: 'Name of the color' })
  @IsNotEmpty()
  @IsString()
  name: string;
}
