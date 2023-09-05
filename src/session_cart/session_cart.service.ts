import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { Product } from '../product/model/product.model';
import { ProductService } from '../product/product.service';
import { Session } from '../session/model/session.model';
import { SessionService } from '../session/session.service';
import { CreateSessionCartDto } from './dto/create-session_cart.dto';
import { UpdateSessionCartDto } from './dto/update-session_cart.dto';
import { SessionCart } from './model/session_cart.model';

@Injectable()
export class SessionCartService {
  constructor(
    @InjectModel(SessionCart) private sessionCartRepository: typeof SessionCart,
    @InjectModel(Session) private sessionService: typeof Session,
    @InjectModel(Product) private productService: typeof Product,
  ) {}

  async create(createSessionCartDto: CreateSessionCartDto, cookie: string) {
    const product = await this.productService.findOne({
      where: { id: createSessionCartDto.product_id },
    });
    const uniqueCartId = await this.sessionService.findOne({
      where: { session_unique_id: cookie },
    });
    const price = product.price * createSessionCartDto.quantity;
    const sessionInput = {
      session_id: uniqueCartId.cart_unique_id,
      product_id: createSessionCartDto.product_id,
      quantity: createSessionCartDto.quantity,
      subtotal: price,
    };
    const sessionCart = await this.sessionCartRepository.create(sessionInput);
    return sessionCart;
  }

  async findAll(): Promise<SessionCart[]> {
    const sessionCarts = await this.sessionCartRepository.findAll({
      include: { all: true },
    });
    return sessionCarts;
  }

  async findOne(id: number): Promise<SessionCart> {
    const sessionCart = await this.sessionCartRepository.findOne({
      where: { id },
    });
    return sessionCart;
  }

  async findItems(id: string): Promise<SessionCart[]> {
    const sessionCart = await this.sessionCartRepository.findAll({
      where: { session_id: id },
      include: { all: true },
    });
    return sessionCart;
  }

  async update(
    id: number,
    updateSessionCartDto: UpdateSessionCartDto,
  ): Promise<[number, SessionCart[]]> {
    const updatedSessionCarts = await this.sessionCartRepository.update(
      updateSessionCartDto,
      { where: { id }, returning: true },
    );
    return updatedSessionCarts;
  }

  async remove(id: number): Promise<number> {
    const deletedSessionCarts = await this.sessionCartRepository.destroy({
      where: { id },
    });
    return deletedSessionCarts;
  }
  async destroy() {
    return this.sessionCartRepository.destroy({
      where: { id: { [Op.gte]: 0 } },
    });
  }
}
