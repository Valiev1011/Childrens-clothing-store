import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();

    if (
      String(req.payload.role) !== 'user' &&
      String(req.payload.role) !== 'admin'
    ) {
      console.log(req.payload.role);
      throw new UnauthorizedException('Access denied');
    }
    if (!req.payload.is_active) {
      throw new UnauthorizedException('User is not active');
    }
    
    return true;
  }
}
