import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SessionCartService } from './session_cart.service';
import { CreateSessionCartDto } from './dto/create-session_cart.dto';
import { UpdateSessionCartDto } from './dto/update-session_cart.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CookieGetter } from '../decorators/cookieGetter.decorator';

@Controller('session-cart')
@ApiTags('Session Cart') // Optional: Use this decorator to group endpoints under a common tag in Swagger
export class SessionCartController {
  constructor(private readonly sessionCartService: SessionCartService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new session cart' })
  create(
    @Body() createSessionCartDto: CreateSessionCartDto,
    @CookieGetter('step_cookie') cookie: string,
  ) {
    return this.sessionCartService.create(createSessionCartDto,cookie);
  }

  @Get()
  @ApiOperation({ summary: 'Get all session carts' })
  findAll() {
    return this.sessionCartService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a session cart by ID' })
  findOne(@Param('id') id: string) {
    return this.sessionCartService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a session cart by ID' })
  update(
    @Param('id') id: string,
    @Body() updateSessionCartDto: UpdateSessionCartDto,
  ) {
    return this.sessionCartService.update(+id, updateSessionCartDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a session cart by ID' })
  remove(@Param('id') id: string) {
    return this.sessionCartService.remove(+id);
  }
}
