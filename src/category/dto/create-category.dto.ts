import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({
    example: 'Category Name',
    description: 'Name of the category',
  })
  @IsNotEmpty({ message: 'Category name is required' })
  @IsString({ message: 'Category name must be a string' })
  name: string;

  @ApiProperty({
    example: 'Category Description',
    description: 'Description of the category',
  })
  @IsNotEmpty({ message: 'Category description is required' })
  @IsString({ message: 'Category description must be a string' })
  description: string;
}
