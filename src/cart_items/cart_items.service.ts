import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { ProductService } from '../product/product.service';
// import { where } from 'sequelize';
// import { AddressService } from '../address/address.service';
// import { CreateAddressDto } from '../address/dto/create-address.dto';
// import { CartService } from '../cart/cart.service';
// import { OrderItemsService } from '../order_items/order_items.service';
// import { User } from '../user/model/user.model';
// import { ZakazService } from '../zakaz/zakaz.service';
import { CreateCartItemDto } from './dto/create-cart_item.dto';
import { UpdateCartItemDto } from './dto/update-cart_item.dto';
import { CartItem } from './model/cart_item.model';

@Injectable()
export class CartItemsService {
  constructor(
    @InjectModel(CartItem)
    private cartItemRepository: typeof CartItem,
    // private readonly addressService: AddressService,
    // private readonly cartService: CartService,
    // private readonly orderService: ZakazService,
    // private readonly orderItemService: OrderItemsService,
    // private readonly jwtService: JwtService,
    private readonly productService: ProductService,
  ) {}

  async create(createCartItemDto: CreateCartItemDto): Promise<CartItem> {
    const product = await this.productService.findOne(
      createCartItemDto.product_id,
    );
    const price = product.price * createCartItemDto.quantity;
    console.log(product);
    const createCartItem = {
      ...createCartItemDto,
      subtotal: price,
    };
    const cartItem = await this.cartItemRepository.create(createCartItem);
    return cartItem;
  }

  async findAll() {
    const cartItems = await this.cartItemRepository.findAll({
      include: { all: true },
    });

    return cartItems;
  }

  async findCarts(id: number) {
    const cartItems = await this.cartItemRepository.findAll({
      where: { cart_id: id },
      include: { all: true },
    });

    return cartItems;
  }

  async destroy() {
    return this.cartItemRepository.destroy({
      where: { id: { [Op.gte]: 0 } },
    });
  }

  async findOne(id: number): Promise<CartItem> {
    const cartItem = await this.cartItemRepository.findOne({
      where: { id },
    });
    return cartItem;
  }

  // async ordering(
  //   id: number,
  //   createAddressDto: CreateAddressDto,
  //   token: string,
  // ) {
  //   let decodedToken: Partial<User>, error: Error;
  //   try {
  //     decodedToken = await this.jwtService.verify(token, {
  //       secret: process.env.REFRESH_TOKEN_KEY,
  //     });
  //   } catch (err) {
  //     error = err;
  //   }
  //   const addressDto = {
  //     user_id: decodedToken.id,
  //     street: createAddressDto.street,
  //     city: createAddressDto.city,
  //     zip_code: createAddressDto.zip_code,
  //     phone_number: createAddressDto.phone_number,
  //   };

  //   const address = await this.addressService.create(addressDto);

  //   const cartID = await this.cartItemRepository.findByPk(id);

  //   const ID = await this.cartService.findOne(cartID.cart_id);

  //   const cartItems = await this.cartItemRepository.findAll({
  //     where: { cart_id: cartID.cart_id },
  //   });

  //   const productIds = cartItems.map((cartItem) => cartItem.product_id);
  //   const quantities = cartItems.map((cartItem) => cartItem.quantity);
  //   const subtotals = cartItems.map((cartItem) => cartItem.subtotal);

  //   const combinedCartItems = [];

  //   for (let i = 0; i < cartItems.length; i++) {
  //     const newCartItem = {
  //       product_id: productIds[i],
  //       quantity: quantities[i],
  //       subtotal: subtotals[i],
  //     };

  //     combinedCartItems.push(newCartItem);
  //   }
  //   console.log(combinedCartItems);

  //   // const userID = await this.cartService.findOne(cartID.cart_id);
  //   let total = 0;
  //   subtotals.forEach((price) => {
  //     total = total + price;
  //   });
  //   let date = new Date(Date.now());
  //   const createOrder = {
  //     user_id: decodedToken.id,
  //     order_date: date,
  //     order_status: 'Processing',
  //     total_amount: total,
  //     shipping_address: address.id,
  //   };
  //   const order = await this.orderService.create(createOrder);

  //   for (const cartItem of combinedCartItems) {
  //     const subtotal = cartItem.quantity * cartItem.subtotal;

  //     const orderItem = {
  //       productId: cartItem.product_id,
  //       quantity: cartItem.quantity,
  //       subtotal: subtotal,
  //       orderId: order.id,
  //     };

  //     await this.orderItemService.create(orderItem);
  //   }
  // }

  async update(
    id: number,
    updateCartItemDto: UpdateCartItemDto,
  ): Promise<[number, CartItem[]]> {
    const updatedCartItems = await this.cartItemRepository.update(
      updateCartItemDto,
      { where: { id }, returning: true },
    );
    return updatedCartItems;
  }

  async remove(id: number): Promise<number> {
    const deletedCartItems = await this.cartItemRepository.destroy({
      where: { id },
    });
    return deletedCartItems;
  }
}
