import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsDate,
  IsObject,
  IsOptional,
} from 'class-validator';

export class CreateSessionDto {
  @ApiProperty({
    example: '2023-08-01T08:00:00Z',
    description: 'Start date and time of the session',
  })
  @IsNotEmpty()
  @IsDate()
  session_start: Date;

  @ApiProperty({
    example: '2023-08-01T18:00:00Z',
    description: 'End date and time of the session',
  })
  @IsNotEmpty()
  @IsDate()
  session_end: Date;
}
