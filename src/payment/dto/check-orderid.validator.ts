import { Injectable } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { UserService } from '../../user/user.service';
import { ZakazService } from '../../zakaz/zakaz.service';

@ValidatorConstraint({ name: 'ID', async: false })
@Injectable()
export class CheckUserIdValidator implements ValidatorConstraintInterface {
  constructor(private readonly userService: UserService) {}
  async validate(value: number, args: ValidationArguments) {

   try {
     const order = await this.userService.findOne(value);
     return !!order;
   } catch (error) {
     return false;
   }
  }
}
