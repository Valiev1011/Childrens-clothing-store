import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSizeDto {
  @ApiProperty({ example: 'Small', description: 'Name of the size' })
  @IsNotEmpty()
  @IsString()
  name: string;
}
