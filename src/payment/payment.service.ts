import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { Payment } from './model/payment.model';

@Injectable()
export class PaymentService {
  constructor(
    @InjectModel(Payment)
    private paymentRepository: typeof Payment,
  ) {}

  async create(createPaymentDto: CreatePaymentDto): Promise<Payment> {
    try {
      const payment = await this.paymentRepository.create(createPaymentDto);
      return payment;
    } catch (error) {
      throw new BadRequestException('Order ID not found');
    }
  }

  async findAll(): Promise<Payment[]> {
    const payments = await this.paymentRepository.findAll();
    return payments;
  }

  async findOne(id: number): Promise<Payment> {
    const payment = await this.paymentRepository.findOne({
      where: { id },
    });
    return payment;
  }

  async update(
    id: number,
    updatePaymentDto: UpdatePaymentDto,
  ): Promise<[number, Payment[]]> {
    const updatedPayments = await this.paymentRepository.update(
      updatePaymentDto,
      { where: { id }, returning: true },
    );
    return updatedPayments;
  }

  async remove(id: number): Promise<number> {
    const deletedPayments = await this.paymentRepository.destroy({
      where: { id },
    });
    return deletedPayments;
  }
}
