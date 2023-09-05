import { PartialType } from '@nestjs/swagger';
import { CreateSessionCartDto } from './create-session_cart.dto';

export class UpdateSessionCartDto extends PartialType(CreateSessionCartDto) {}
