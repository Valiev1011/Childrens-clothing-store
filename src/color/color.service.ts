import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateColorDto } from './dto/create-color.dto';
import { UpdateColorDto } from './dto/update-color.dto';
import { Color } from './model/color.model'; // Import the Color model

@Injectable()
export class ColorService {
  constructor(
    @InjectModel(Color) // Inject the Color model
    private colorRepository: typeof Color, // Use the Color model
  ) {}

  async create(createColorDto: CreateColorDto): Promise<Color> {
    const color = await this.colorRepository.create(createColorDto);
    return color;
  }

  async findAll(): Promise<Color[]> {
    const colors = await this.colorRepository.findAll();
    return colors;
  }

  async findOne(id: number): Promise<Color> {
    const color = await this.colorRepository.findOne({
      where: { id },
    });
    return color;
  }

  async update(
    id: number,
    updateColorDto: UpdateColorDto,
  ): Promise<[number, Color[]]> {
    const updatedColors = await this.colorRepository.update(updateColorDto, {
      where: { id },
      returning: true,
    });
    return updatedColors;
  }

  async remove(id: number): Promise<number> {
    const deletedColors = await this.colorRepository.destroy({
      where: { id },
    });
    return deletedColors;
  }
}
