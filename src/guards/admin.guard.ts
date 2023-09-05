import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();

    console.log(String(req.payload.role));
    if (String(req.payload.role) != 'admin') {
      throw new UnauthorizedException('You are not admin');
    }
    if (!req.payload.is_active) {
      throw new UnauthorizedException('Admin is not active');
    }
    return true;
  }
}
