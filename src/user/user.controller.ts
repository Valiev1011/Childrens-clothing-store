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
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Response } from 'express';
import { RedisService } from '../redis/redis.service';
import { CreateRediDto } from '../redis/dto/set-redis.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { CookieGetter } from '../decorators/cookieGetter.decorator';
import { ValidateEmailPipe } from './validation.pipe';
import { JwtGuard } from '../guards/jwt.guard';
import { AdminGuard } from '../guards/admin.guard';
import { SelfGuard } from '../guards/user-self.guard';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly redisService: RedisService,
  ) {}

  @ApiOperation({ summary: 'Create a new user' })
  @Post()
  signup(
    @Body() createUserDto: CreateUserDto,
    @Res({ passthrough: true }) res: Response,
    @CookieGetter('step_cookie') id: string,
  ) {
    return this.userService.signup(createUserDto, res, id);
  }

  @ApiOperation({ summary: 'signout User' })
  @HttpCode(HttpStatus.OK)
  @Post('signin')
  signin(
    @Body() loginAdminDto: LoginUserDto,
    @Res({ passthrough: true }) res: Response,
    @CookieGetter('step_cookie') id: string,
  ) {
    return this.userService.signin(loginAdminDto, res, id);
  }

  // @UseGuards(JwtGuard)
  @ApiOperation({ summary: 'signout User' })
  @HttpCode(HttpStatus.OK)
  @Post('signout')
  signout(
    @Res({ passthrough: true }) res: Response,
    @CookieGetter('refresh_token') token: string,
  ) {
    return this.userService.signout(token, res);
  }

  @Post(':id/refresh')
  refresh(
    @Param('id', ParseIntPipe) id: number,
    @CookieGetter('refresh_token') refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.userService.refreshToken(id, refreshToken, res);
  }

  @UseGuards(JwtGuard, AdminGuard)
  @ApiOperation({ summary: 'Get all users' })
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @UseGuards(JwtGuard, SelfGuard)
  @ApiOperation({ summary: 'Get a user by ID' })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOne(id);
  }

  @ApiOperation({ summary: 'verifires user' })
  @Post('activate')
  verify(
    @Body() redisDto: CreateRediDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.userService.verify(redisDto, res);
  }

  @ApiOperation({ summary: 'get new otp' })
  @Post('get')
  newOtp(@Body('gmail', ValidateEmailPipe) gmail: string) {
    return this.userService.getNewOtp(gmail);
  }

  @UseGuards(JwtGuard, SelfGuard)
  @ApiOperation({ summary: 'Update a user by ID' })
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(id, updateUserDto);
  }

  @ApiOperation({ summary: 'Delete a user by ID' })
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    console.log('cont');

    return this.userService.remove(id);
  }
}
