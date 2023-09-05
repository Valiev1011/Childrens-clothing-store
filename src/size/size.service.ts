import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateSizeDto } from './dto/create-size.dto';
import { UpdateSizeDto } from './dto/update-size.dto';
import { Size } from './model/size.model'; // Import your Size model here

@Injectable()
export class SizeService {
  constructor(
    @InjectModel(Size)
    private sizeRepository: typeof Size,
  ) {}

  async create(createSizeDto: CreateSizeDto): Promise<Size> {
    const size = await this.sizeRepository.create(createSizeDto);
    return size;
  }

  async findAll(): Promise<Size[]> {
    const sizes = await this.sizeRepository.findAll();
    return sizes;
  }

  async findOne(id: number): Promise<Size | null> {
    const size = await this.sizeRepository.findByPk(id);
    return size;
  }

  async update(
    id: number,
    updateSizeDto: UpdateSizeDto,
  ): Promise<[number, Size[]]> {
    const updatedSize = await this.sizeRepository.update(updateSizeDto, {
      where: { id },
      returning: true,
    });
    return updatedSize;
  }

  async remove(id: number): Promise<number> {
    const deletedRowCount = await this.sizeRepository.destroy({
      where: { id },
    });
    return deletedRowCount;
  }
}
