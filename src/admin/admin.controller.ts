import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpStatus,
  HttpCode,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Response } from 'express';
import { RedisService } from '../redis/redis.service';
import { CreateRediDto } from '../redis/dto/set-redis.dto';
import { LoginAdminDto } from './dto/login-admin.dto';
import { CookieGetter } from '../decorators/cookieGetter.decorator';
import { ValidateEmailPipe } from './validation.pipe';
import { JwtGuard } from '../guards/jwt.guard';
import { IsCreatorGuard } from '../guards/isCreator.guard';
import { SelfGuard } from '../guards/user-self.guard';
import { AdminGuard } from '../guards/admin.guard';

@ApiTags('Admin')
@Controller('admin')
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private readonly redisService: RedisService,
  ) {}
  
  @ApiOperation({ summary: 'Create a new admin' })
  @Post()
  create(
    @Body() createAdminDto: CreateAdminDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.adminService.create(createAdminDto, res);
  }

  @ApiOperation({ summary: 'signin Admin' })
  @HttpCode(HttpStatus.OK)
  @Post('signin')
  signin(
    @Body() loginAdminDto: LoginAdminDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.adminService.signin(loginAdminDto, res);
  }

  @UseGuards(JwtGuard)
  @ApiOperation({ summary: 'signout Admin' })
  @HttpCode(HttpStatus.OK)
  @Post('signout')
  signout(
    @Res({ passthrough: true }) res: Response,
    @CookieGetter('refresh_token') token: string,
  ) {
    return this.adminService.signout(token, res);
  }

  @Post(':id/refresh')
  refresh(
    @Param('id', ParseIntPipe) id: number,
    @CookieGetter('refresh_token') refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.adminService.refreshToken(id, refreshToken, res);
  }

  @UseGuards(JwtGuard, IsCreatorGuard)
  @ApiOperation({ summary: 'Get all admins' })
  @Get()
  findAll() {
    return this.adminService.findAll();
  }

  @UseGuards(JwtGuard, SelfGuard, AdminGuard)
  @ApiOperation({ summary: 'Get a admin by ID' })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.adminService.findOne(id);
  }

  @ApiOperation({ summary: 'verifires admin' })
  @Post('activate')
  verify(
    @Body() redisDto: CreateRediDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.adminService.verify(redisDto, res);
  }

  @ApiOperation({ summary: 'get new otp' })
  @Post('get')
  newOtp(@Body('gmail', ValidateEmailPipe) gmail: string) {
    return this.adminService.getNewOtp(gmail);
  }

  @UseGuards(JwtGuard, SelfGuard, AdminGuard)
  @ApiOperation({ summary: 'Update a admin by ID' })
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAdminDto: UpdateAdminDto,
  ) {
    return this.adminService.update(id, updateAdminDto);
  }

  @UseGuards(JwtGuard, IsCreatorGuard)
  @ApiOperation({ summary: 'Delete a admin by ID' })
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    console.log('cont');

    return this.adminService.remove(id);
  }
}
