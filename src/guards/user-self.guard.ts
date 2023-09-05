import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class SelfGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    console.log(String(req.payload.role));
    if (String(req.payload.id) !== req.params.id && !req.payload.is_creator) {
      throw new ForbiddenException({
        message: 'Ruxsat etilmagan foydalanuvchi1',
      });
    }
    return true;
  }
}
