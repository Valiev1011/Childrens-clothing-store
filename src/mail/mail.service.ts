import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { Admin } from '../admin/model/admin.model';
import { User } from '../user/model/user.model';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendConfirmation(info: User | Admin, otp: string): Promise<void> {
    try {
      await this.mailerService.sendMail({
        to: info.email,
        subject: "Welcome to Children's clothing store! Confirm your Email!",
        template: './confirmation',
        context: {
          name: info.first_name,
          otp,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }
}
