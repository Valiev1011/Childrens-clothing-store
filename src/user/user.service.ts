import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import * as otpGenerator from 'otp-generator';

import { User } from './model/user.model';
import { Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { MailService } from '../mail/mail.service';
import { RedisService } from '../redis/redis.service';
import { CreateRediDto } from '../redis/dto/set-redis.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { CartService } from '../cart/cart.service';
import { SessionService } from '../session/session.service';
import { SessionCartService } from '../session_cart/session_cart.service';
import { CartItemsService } from '../cart_items/cart_items.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private userRepository: typeof User,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
    private readonly redisService: RedisService,
    private readonly cartService: CartService,
    private readonly sessionService: SessionService,
    private readonly sessionCartService: SessionCartService,
    private readonly cartItemsService: CartItemsService,
  ) {}

  async signup(createUserDto: CreateUserDto, res: Response, id: string) {
    const user = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });
    if (user) {
      throw new BadRequestException('This email is already exists');
    }
    const hashed_password = await bcrypt.hash(createUserDto.password, 7);
    const newUser = await this.userRepository.create({
      ...createUserDto,
      password: hashed_password,
    });

    // console.log(newUser);
    const tokens = await this.getTokens(newUser);

    const updatedUser = await this.updateRefreshToken(
      newUser.id,
      tokens.refresh_token,
    );

    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    const otp = otpGenerator.generate(4, {
      lowerCaseAlphabets: false,
      specialChars: false,
      upperCaseAlphabets: false,
    });
    await this.redisService.set(updatedUser.email, otp);

    try {
      await this.mailService.sendConfirmation(updatedUser, otp);
    } catch (error) {
      console.log(error);
    }

    const createCartDto = {
      user_id: newUser.id,
    };

    const newCart = await this.cartService.create(createCartDto);

    // const session = await this.sessionService.findSession(id);

    // const updatedSession = await this.sessionService.updateId(
    //   session.id,
    //   newUser.id,
    // );

    // console.log(id);
    // const find = await this.cartService.find(newUser.id);

    const session = await this.sessionService.findSession(id);

    // console.log(session);

    const sessionCart = await this.sessionCartService.findItems(
      session.cart_unique_id,
    );

    console.log(sessionCart.values());

    const productIds = sessionCart.map((cartItem) => cartItem.product_id);
    const quantities = sessionCart.map((cartItem) => cartItem.quantity);
    const subtotals = sessionCart.map((cartItem) => cartItem.subtotal);

    console.log(productIds, quantities, subtotals);
    const combinedCartItems = [];

    for (let i = 0; i < sessionCart.length; i++) {
      const newCartItem = {
        product_id: productIds[i],
        quantity: quantities[i],
        subtotal: subtotals[i],
      };

      combinedCartItems.push(newCartItem);
    }
    console.log(combinedCartItems);

    let total = 0;
    combinedCartItems.forEach((price) => {
      total = total + +price.subtotal;
    });
    console.log(total);

    for (const cartItem of combinedCartItems) {
      console.log(cartItem);
      console.log(cartItem.quantity);
      const subtotal = cartItem.quantity * cartItem.subtotal;

      const sessionItem = {
        product_id: cartItem.product_id,
        quantity: cartItem.quantity,
        subtotal: cartItem.subtotal,
        cart_id: newCart.id,
      };

      await this.cartItemsService.create(sessionItem);
    }

    await this.sessionCartService.destroy();


    const response = {
      message: 'User registred',
      user: newUser,
      tokens,
    };
    return response;
  }

  async signin(loginUserDto: LoginUserDto, res: Response, id: string) {
    const { email, password } = loginUserDto;
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('User not registred');
    }
    if (!user.is_active) {
      throw new UnauthorizedException('User is not active');
    }
    const isMatchPass = await bcrypt.compare(password, user.password);
    if (!isMatchPass) {
      throw new UnauthorizedException('User not registred');
    }
    const tokens = await this.getTokens(user);

    const updatedUser = await this.updateRefreshToken(
      user.id,
      tokens.refresh_token,
    );

    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    const find = await this.cartService.find(user.id);
    // const session = await this.sessionService.findSession(id);

    // const updatedSession = await this.sessionService.updateId(
    //   session.id,
    //   user.id,
    // );

    // console.log(id);
    const session = await this.sessionService.findSession(id);

    // console.log(session);

    const sessionCart = await this.sessionCartService.findItems(
      session.cart_unique_id,
    );

    console.log(sessionCart.values());

    const productIds = sessionCart.map((cartItem) => cartItem.product_id);
    const quantities = sessionCart.map((cartItem) => cartItem.quantity);
    const subtotals = sessionCart.map((cartItem) => cartItem.subtotal);

    console.log(productIds, quantities, subtotals);
    const combinedCartItems = [];

    for (let i = 0; i < sessionCart.length; i++) {
      const newCartItem = {
        product_id: productIds[i],
        quantity: quantities[i],
        subtotal: subtotals[i],
      };

      combinedCartItems.push(newCartItem);
    }
    console.log(combinedCartItems);

    let total = 0;
    combinedCartItems.forEach((price) => {
      total = total + +price.subtotal;
    });
    console.log(total);

    for (const cartItem of combinedCartItems) {
      console.log(cartItem);
      console.log(cartItem.quantity);
      const subtotal = cartItem.quantity * cartItem.subtotal;

      const sessionItem = {
        product_id: cartItem.product_id,
        quantity: cartItem.quantity,
        subtotal: cartItem.subtotal,
        cart_id: find.id,
      };

      await this.cartItemsService.create(sessionItem);
    }

    await this.sessionCartService.destroy();

    const response = {
      message: 'User logged in',
      user: updatedUser,
      tokens,
    };
    return response;
  }

  async signout(refreshToken: string, res: Response) {
    let userData: Partial<User>, error: Error;
    try {
      userData = await this.jwtService.verify(refreshToken, {
        secret: process.env.REFRESH_TOKEN_KEY,
      });
    } catch (err) {
      error = err;
    }
    console.log(userData);
    if (!userData) {
      throw new ForbiddenException('User not found');
    }
    const ID = await this.userRepository.findByPk(userData.id);

    if (!ID) {
      throw new NotFoundException('User not found');
    }
    const updatedUser = await this.userRepository.update(
      {
        hashed_token: null,
      },
      {
        where: { id: userData.id },
        returning: true,
      },
    );
    res.clearCookie('refresh_token');
    const respone = {
      message: 'User logged out successfully',
      user: updatedUser[1][0],
    };
    return respone;
  }

  async refreshToken(user_id: number, refreshToken: string, res: Response) {
    console.log(refreshToken);
    let decodedToken: Partial<User>, error: Error;
    try {
      decodedToken = await this.jwtService.verify(refreshToken, {
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

    const findUser = await this.userRepository.findByPk(decodedToken.id);
    if (!findUser) {
      throw new UnauthorizedException('User not found');
    }

    console.log(decodedToken);
    if (decodedToken['id'] != user_id) {
      throw new BadRequestException('User not found');
    }

    if (!bcrypt.compareSync(refreshToken, findUser.hashed_token)) {
      throw new ForbiddenException('Cookie malfored!');
    }

    const user = await this.userRepository.findOne({
      where: { id: user_id },
    });
    if (!user || !user.hashed_token) {
      throw new BadRequestException('User is not found');
    }
    const tokenMatch = await bcrypt.compare(refreshToken, user.hashed_token);
    if (!tokenMatch) {
      throw new ForbiddenException('Forbidden');
    }
    const tokens = await this.getTokens(user);

    const updatedUser = await this.updateRefreshToken(
      user.id,
      tokens.refresh_token,
    );

    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    const response = {
      message: 'User refreshed',
      user: updatedUser,
      tokens,
    };
    return response;
  }

  async updateRefreshToken(
    userId: number,
    refreshToken: string,
  ): Promise<User> {
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 7);
    const updatedUser = await this.userRepository.update(
      {
        hashed_token: hashedRefreshToken,
      },
      {
        where: { id: userId },
        returning: true,
      },
    );
    return updatedUser[1][0];
  }

  async getNewOtp(email: string) {
    const info = await this.userRepository.findOne({ where: { email } });
    const otp = otpGenerator.generate(4, {
      lowerCaseAlphabets: false,
      specialChars: false,
      upperCaseAlphabets: false,
    });
    await this.redisService.set(email, otp);

    try {
      await this.mailService.sendConfirmation(info, otp);
    } catch (error) {
      console.log(error);
    }
    return { message: 'Otp sent' };
  }

  async verify(redisDto: CreateRediDto, res: Response) {
    const { key, value } = redisDto;
    console.log(key, value);
    const check = await this.redisService.get(key);

    if (!check) {
      throw new BadRequestException('Otp expired');
    }

    if (value !== check) {
      throw new BadRequestException('Otp not matched');
    }

    const isActive = await this.userRepository.findOne({
      where: { email: key },
    });

    if (isActive.is_active) {
      throw new BadRequestException('User already activated');
    }
    const newUser = await this.userRepository.update(
      {
        is_active: true,
      },
      {
        where: { email: key },
        returning: true,
      },
    );
    console.log(newUser[1][0].id);
    const tokens = await this.getTokens(newUser[1][0]);

    const updatedUser = await this.updateRefreshToken(
      newUser[1][0].id,
      tokens.refresh_token,
    );

    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    const response = {
      message: 'User activated',
      updatedUser,
      tokens,
    };
    return response;
  }

  async getTokens(user: User) {
    const jwtPayload = {
      id: user.id,
      is_active: user.is_active,
      role: 'user',
    };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);
    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  async findAll(): Promise<User[]> {
    const users = await this.userRepository.findAll();
    return users;
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
    });
    return user;
  }

  async update(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<[number, User[]]> {
    const updatedUsers = await this.userRepository.update(updateUserDto, {
      where: { id },
      returning: true,
    });
    return updatedUsers;
  }

  async remove(id: number): Promise<number> {
    const ID = await this.userRepository.findByPk(id);
    console.log('1');
    if (!ID) {
      throw new NotFoundException('Bunday user topilmadi');
    }
    console.log('1');

    const deletedUsers = await this.userRepository.destroy({
      where: { id },
    });
    return deletedUsers;
  }
}
