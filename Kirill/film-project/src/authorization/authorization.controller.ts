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
import { CreateAuthorizationDto } from './dto/create-authorization.dto';
import { UpdateAuthorizationDto } from './dto/update-authorization.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('user/login')
@Controller('user/login')
export class AuthorizationController {
  constructor(private readonly authorizationService: AuthorizationService) {}

  @HttpCode(HttpStatus.OK)
  @Post()
  login(@Body() createAuthorizationDto: CreateAuthorizationDto) {
    return this.authorizationService.loginUser(createAuthorizationDto);
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
  remove(@Param('id') id: string) {
    return this.authorizationService.remove(id);
  }
}
