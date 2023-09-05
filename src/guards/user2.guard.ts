import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class User2Guard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();

    if (String(req.payload.role) !== 'user') {
      console.log(req.payload.role);
      throw new UnauthorizedException('Access denied');
    }
    if (!req.payload.is_active) {
      throw new UnauthorizedException('User is not active');
    }
    return true;
  }
}
