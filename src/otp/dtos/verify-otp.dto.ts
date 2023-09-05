import {
  IsNotEmpty,
  IsNumberString,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

export class VerifyOtpDto {
  @IsNotEmpty()
  @IsPhoneNumber()
  check: string;

  @IsNotEmpty()
  @IsString()
  verificationKey: string;

  @IsNotEmpty()
  @IsNumberString()
  otp: string;
}
