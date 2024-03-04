import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthorizationService } from './authorization.service';
import { UserService } from '../user/user.service';
import { MailService } from '../mail/mail.service';
import { CreateAuthorizationDto } from './dto/create-authorization.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Public } from '../decorators/public.decorator';

@ApiBearerAuth()
@ApiTags('auth')
@Controller('auth')
export class AuthorizationController {
  constructor(
    private readonly authorizationService: AuthorizationService,
    private readonly userService: UserService,
    private readonly mailService: MailService,
  ) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('/link')
  async createLink(@Body() createAuthorizationDto: CreateAuthorizationDto) {
    const { email } = createAuthorizationDto;

    const user = await this.userService.findByEmail(email);
    const html = await this.authorizationService.createLink(user.token);
    this.mailService.sendMessage({ email, html, subject: 'Magic link' });
  }
}
