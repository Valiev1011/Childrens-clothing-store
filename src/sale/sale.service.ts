import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { Sale } from './model/sale.model';

@Injectable()
export class SaleService {
  constructor(
    @InjectModel(Sale)
    private saleRepository: typeof Sale,
  ) {}

  async create(createSaleDto: CreateSaleDto): Promise<Sale> {
    const sale = await this.saleRepository.create(createSaleDto);
    return sale;
  }

  async findAll(): Promise<Sale[]> {
    const sales = await this.saleRepository.findAll({
      include: { all: true },
    });
    return sales;
  }

  async findOne(id: number): Promise<Sale> {
    const sale = await this.saleRepository.findOne({
      where: { id },
    });
    return sale;
  }

  async update(
    id: number,
    updateSaleDto: UpdateSaleDto,
  ): Promise<[number, Sale[]]> {
    const updatedSales = await this.saleRepository.update(updateSaleDto, {
      where: { id },
      returning: true,
    });
    return updatedSales;
  }

  async remove(id: number): Promise<number> {
    const deletedSales = await this.saleRepository.destroy({
      where: { id },
    });
    return deletedSales;
  }
}
