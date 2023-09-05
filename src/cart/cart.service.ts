import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { AddressService } from '../address/address.service';
import { CreateAddressDto } from '../address/dto/create-address.dto';
import { CartItemsService } from '../cart_items/cart_items.service';
import { OrderItem } from '../order_items/model/order_item.model';
import { OrderItemsService } from '../order_items/order_items.service';
import { User } from '../user/model/user.model';
import { ZakazService } from '../zakaz/zakaz.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { Cart } from './model/cart.model';

@Injectable()
export class CartService {
  constructor(
    @InjectModel(Cart)
    private cartRepository: typeof Cart,
    private readonly addressService: AddressService,
    private readonly orderService: ZakazService,
    private readonly orderItemService: OrderItemsService,
    private readonly jwtService: JwtService,
    private readonly cartItemService: CartItemsService,
  ) {}

  async create(createCartDto: CreateCartDto): Promise<Cart> {
    const cart = await this.cartRepository.create(createCartDto);
    return cart;
  }

  async ordering(createAddressDto: CreateAddressDto, token: string) {
    let decodedToken: Partial<User>, error: Error;
    try {
      decodedToken = await this.jwtService.verify(token, {
        secret: process.env.REFRESH_TOKEN_KEY,
      });
    } catch (err) {
      error = err;
    }

    if (error) {
      if (error.message !== 'jwt expired') {
        throw new BadRequestException('Jwt modified');
      }
      throw new UnauthorizedException('Need login action');
    }

    const addressDto = {
      user_id: decodedToken.id,
      street: createAddressDto.street,
      city: createAddressDto.city,
      zip_code: createAddressDto.zip_code,
      phone_number: createAddressDto.phone_number,
    };

    const address = await this.addressService.create(addressDto);

    // const cartID = await this.cartItemRepository.findByPk(id);

    const ID = await this.cartRepository.findOne({
      where: { user_id: decodedToken.id },
    });

    const cartItems = await this.cartItemService.findCarts(ID.id);

    const productIds = cartItems.map((cartItem) => cartItem.product_id);
    const quantities = cartItems.map((cartItem) => cartItem.quantity);
    const subtotals = cartItems.map((cartItem) => cartItem.subtotal);
    console.log(productIds, quantities, subtotals);
    const combinedCartItems = [];

    for (let i = 0; i < cartItems.length; i++) {
      const newCartItem = {
        product_id: productIds[i],
        quantity: quantities[i],
        subtotal: subtotals[i],
      };

      combinedCartItems.push(newCartItem);
    }
    console.log(combinedCartItems);

    // const userID = await this.cartService.findOne(cartID.cart_id);
    let total = 0;
    combinedCartItems.forEach((price) => {
      total = total + +price.subtotal;
    });
    console.log(total);
    const date = new Date(Date.now());
    // let info: OrderItem;
    const createOrder = {
      user_id: decodedToken.id,
      order_date: date,
      order_status: 'Processing',
      total_amount: total,
      shipping_address: address.id,
    };
    const order = await this.orderService.create(createOrder);

    for (const cartItem of combinedCartItems) {
      console.log(cartItem);
      console.log(cartItem.quantity);
      const subtotal = cartItem.quantity * cartItem.subtotal;

      const orderItem = {
        productId: cartItem.product_id,
        quantity: cartItem.quantity,
        subtotal: cartItem.subtotal,
        orderId: order.id,
      };

      await this.orderItemService.create(orderItem);
    }
    const info = await this.orderService.findOne(order.id);
    await this.cartItemService.destroy();
    return {
      message: 'Your order infos',
      info,
    };
  }

  async findAll() {
    const carts = await this.cartRepository.findAll({ include: { all: true } });

    return carts;
  }

  async findOne(id: number): Promise<Cart> {
    const cart = await this.cartRepository.findOne({
      where: { id },
    });
    if (!cart) {
      throw new NotFoundException('Cart not found');
    }
    return cart;
  }

  async find(id: number): Promise<Cart> {
    const cart = await this.cartRepository.findOne({
      where: { user_id: id },
    });
    return cart;
  }

  async update(
    id: number,
    updateCartDto: UpdateCartDto,
  ): Promise<[number, Cart[]]> {
    const updatedCarts = await this.cartRepository.update(updateCartDto, {
      where: { id },
      returning: true,
    });
    return updatedCarts;
  }

  async remove(id: number): Promise<number> {
    const deletedCarts = await this.cartRepository.destroy({
      where: { id },
    });
    return deletedCarts;
  }
}
