import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Address } from '../address/model/address.model';
import { OrderItem } from '../order_items/model/order_item.model';
import { Product } from '../product/model/product.model';
import { User } from '../user/model/user.model';
import { CreateZakazDto } from './dto/create-zakaz.dto';
import { UpdateZakazDto } from './dto/update-zakaz.dto';

import { Zakaz } from './model/zakaz.model';

@Injectable()
export class ZakazService {
  constructor(
    @InjectModel(Zakaz)
    private zakazRepository: typeof Zakaz,
  ) {}

  async create(createZakazDto: CreateZakazDto): Promise<Zakaz> {
    try {
      const zakaz = await this.zakazRepository.create(createZakazDto);
      return zakaz;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll(): Promise<Zakaz[]> {
    const zakazs = await this.zakazRepository.findAll({
      include: { all: true },
    });
    return zakazs;
  }

  async findOne(id: number): Promise<Zakaz> {
    const zakaz = await this.zakazRepository.findOne({
      where: { id },
      include: [
        {
          model: User,
          attributes: { exclude: ['createdAt', 'updatedAt'] },
        },
        {
          model: Address,
          attributes: { exclude: ['createdAt', 'updatedAt'] },
        },
        {
          model: OrderItem,
          attributes: { exclude: ['createdAt', 'updatedAt'] },
          include: [
            {
              model: Product,
              attributes: { exclude: ['createdAt', 'updatedAt'] },
            },
          ],
        },
      ],
    });
    return zakaz;
  }

  async update(
    id: number,
    updateZakazDto: UpdateZakazDto,
  ): Promise<[number, Zakaz[]]> {
    const updatedZakazs = await this.zakazRepository.update(updateZakazDto, {
      where: { id },
      returning: true,
    });
    return updatedZakazs;
  }

  async remove(id: number): Promise<number> {
    const deletedZakazs = await this.zakazRepository.destroy({
      where: { id },
    });
    return deletedZakazs;
  }
}
