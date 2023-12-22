import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AuthorizationService } from './authorization.service';
import { UserService } from '../user/user.service';
import { MailService } from '../mail/mail.service';
import { CreateAuthorizationDto } from './dto/create-authorization.dto';
import { UpdateAuthorizationDto } from './dto/update-authorization.dto';
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

  @Get()
  findAll() {
    return this.authorizationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authorizationService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAuthorizationDto: UpdateAuthorizationDto,
  ) {
    return this.authorizationService.update(id, updateAuthorizationDto);
  }

  @Delete(':id')
  deleteById(@Param('id') id: string) {
    return this.authorizationService.deleteById(id);
  }
}
