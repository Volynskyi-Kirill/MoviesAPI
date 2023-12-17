import { Injectable } from '@nestjs/common';
import { CreateMailDto } from './dto/create-mail.dto';
import { UpdateMailDto } from './dto/update-mail.dto';
import * as nodemailer from 'nodemailer';
import { FROM_EMAIL, SETTINGS } from './mail.constants';

interface ISendMessage {
  email: string;
  subject: string;
  html: string;
}

@Injectable()
export class MailService {
  private client;

  constructor() {
    this.client = nodemailer.createTransport(SETTINGS);
  }

  async sendMessage({ email, html, subject }: ISendMessage) {
    await this.client.sendMail({
      from: FROM_EMAIL,
      to: email,
      subject,
      html,
    });
  }

  create(createMailDto: CreateMailDto) {
    return 'This action adds a new mail';
  }

  findAll() {
    return `This action returns all mail`;
  }

  findOne(id: number) {
    return `This action returns a #${id} mail`;
  }

  update(id: number, updateMailDto: UpdateMailDto) {
    return `This action updates a #${id} mail`;
  }

  remove(id: number) {
    return `This action removes a #${id} mail`;
  }
}
