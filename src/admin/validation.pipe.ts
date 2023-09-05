import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class ValidateEmailPipe implements PipeTransform<string, string> {
  transform(value: string): string {
    if (!value.match(/\S+@\S+\.\S+/)) {
      throw new BadRequestException('Invalid email address');
    }
    return value;
  }
}
