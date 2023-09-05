import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import * as otpGenerator from 'otp-generator';

import { Admin } from './model/admin.model';
import { Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { MailService } from '../mail/mail.service';
import { RedisService } from '../redis/redis.service';
import { CreateRediDto } from '../redis/dto/set-redis.dto';
import { LoginAdminDto } from './dto/login-admin.dto';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin)
    private adminRepository: typeof Admin,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
    private readonly redisService: RedisService,
  ) {}

  async create(createAdminDto: CreateAdminDto, res: Response) {
    const admin = await this.adminRepository.findOne({
      where: { email: createAdminDto.email },
    });
    if (admin) {
      throw new BadRequestException('This email is already exists');
    }
    const hashed_password = await bcrypt.hash(createAdminDto.password, 7);
    const newAdmin = await this.adminRepository.create({
      ...createAdminDto,
      password: hashed_password,
    });

    // console.log(newAdmin);
    const tokens = await this.getTokens(newAdmin);

    const updatedAdmin = await this.updateRefreshToken(
      newAdmin.id,
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
    await this.redisService.set(updatedAdmin.email, otp);

    try {
      await this.mailService.sendConfirmation(updatedAdmin, otp);
    } catch (error) {
      console.log(error);
    }

    const response = {
      message: 'Admin registred',
      admin: newAdmin,
      tokens,
    };
    return response;
  }

  async signin(loginAdminDto: LoginAdminDto, res: Response) {
    const { email, password } = loginAdminDto;
    const admin = await this.adminRepository.findOne({ where: { email } });
    if (!admin) {
      throw new UnauthorizedException('Admin not registred');
    }
    if (!admin.is_active) {
      throw new UnauthorizedException('Admin is not active');
    }
    const isMatchPass = await bcrypt.compare(password, admin.password);
    if (!isMatchPass) {
      throw new UnauthorizedException('Admin not registred');
    }
    const tokens = await this.getTokens(admin);

    const updatedAdmin = await this.updateRefreshToken(
      admin.id,
      tokens.refresh_token,
    );

    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    const response = {
      message: 'Admin logged in',
      admin: updatedAdmin,
      tokens,
    };
    return response;
  }

  async signout(refreshToken: string, res: Response) {
    let adminData: Partial<Admin>, error: Error;
    try {
      adminData = await this.jwtService.verify(refreshToken, {
        secret: process.env.REFRESH_TOKEN_KEY,
      });
    } catch (err) {
      error = err;
    }
    console.log(adminData);
    if (!adminData) {
      throw new ForbiddenException('Admin not found');
    }
    const ID = await this.adminRepository.findByPk(adminData.id);

    if (!ID) {
      throw new NotFoundException('Admin not found');
    }
    const updatedAdmin = await this.adminRepository.update(
      {
        hashed_token: null,
      },
      {
        where: { id: adminData.id },
        returning: true,
      },
    );
    res.clearCookie('refresh_token');
    const respone = {
      message: 'Admin logged out successfully',
      admin: updatedAdmin[1][0],
    };
    return respone;
  }

  async refreshToken(admin_id: number, refreshToken: string, res: Response) {
    console.log(refreshToken);
    let decodedToken: Partial<Admin>, error: Error;
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

    const findAdmin = await this.adminRepository.findByPk(decodedToken.id);
    if (!findAdmin) {
      throw new UnauthorizedException('Admin not found');
    }

    console.log(decodedToken);
    if (decodedToken['id'] != admin_id) {
      throw new BadRequestException('Admin not found');
    }

    if (!bcrypt.compareSync(refreshToken, findAdmin.hashed_token)) {
      throw new ForbiddenException('Cookie malfored!');
    }

    const admin = await this.adminRepository.findOne({
      where: { id: admin_id },
    });
    if (!admin || !admin.hashed_token) {
      throw new BadRequestException('Admin is not found');
    }
    const tokenMatch = await bcrypt.compare(refreshToken, admin.hashed_token);
    if (!tokenMatch) {
      throw new ForbiddenException('Forbidden');
    }
    const tokens = await this.getTokens(admin);

    const updatedAdmin = await this.updateRefreshToken(
      admin.id,
      tokens.refresh_token,
    );

    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    const response = {
      message: 'Admin refreshed',
      admin: updatedAdmin,
      tokens,
    };
    return response;
  }

  async updateRefreshToken(
    adminId: number,
    refreshToken: string,
  ): Promise<Admin> {
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 7);
    const updatedAdmin = await this.adminRepository.update(
      {
        hashed_token: hashedRefreshToken,
      },
      {
        where: { id: adminId },
        returning: true,
      },
    );
    return updatedAdmin[1][0];
  }

  async getNewOtp(email: string) {
    const info = await this.adminRepository.findOne({ where: { email } });
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

    const isActive = await this.adminRepository.findOne({
      where: { email: key },
    });
    console.log(isActive.is_active);
    if (isActive.is_active) {
      throw new BadRequestException('Admin already activated');
    }
    const newAdmin = await this.adminRepository.update(
      {
        is_active: true,
      },
      {
        where: { email: key },
        returning: true,
      },
    );
    console.log(newAdmin[1][0].id);
    const tokens = await this.getTokens(newAdmin[1][0]);

    const updatedAdmin = await this.updateRefreshToken(
      newAdmin[1][0].id,
      tokens.refresh_token,
    );

    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    const response = {
      message: 'Admin activated',
      updatedAdmin,
      tokens,
    };
    return response;
  }

  async getTokens(admin: Admin) {
    const jwtPayload = {
      id: admin.id,
      is_active: admin.is_active,
      is_creator: admin.is_creator,
      role: 'admin',
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

  async findAll(): Promise<Admin[]> {
    const admins = await this.adminRepository.findAll();
    return admins;
  }

  async findOne(id: number): Promise<Admin> {
    const admin = await this.adminRepository.findOne({
      where: { id },
    });
    return admin;
  }

  async update(
    id: number,
    updateAdminDto: UpdateAdminDto,
  ): Promise<[number, Admin[]]> {
    const updatedAdmins = await this.adminRepository.update(updateAdminDto, {
      where: { id },
      returning: true,
    });
    return updatedAdmins;
  }

  async remove(id: number): Promise<number> {
    const ID = await this.adminRepository.findByPk(id);
    console.log('1');
    if (!ID) {
      throw new NotFoundException('Bunday admin topilmadi');
    }
    console.log('1');

    const deletedAdmins = await this.adminRepository.destroy({
      where: { id },
    });
    return deletedAdmins;
  }
}
