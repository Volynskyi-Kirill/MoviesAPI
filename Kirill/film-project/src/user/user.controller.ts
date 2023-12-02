import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthorizationService } from '../authorization/authorization.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authorizationService: AuthorizationService,
  ) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const token = await this.authorizationService.generateToken(
      createUserDto.email,
    );
    return this.userService.create(createUserDto, token);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/me')
  me(@Req() req: Request) {
    const { user } = req;
    return user;
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
