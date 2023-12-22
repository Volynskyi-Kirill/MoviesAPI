import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../user/schemas/user.schema';
import { CreateAuthorizationDto } from './dto/create-authorization.dto';
import { UpdateAuthorizationDto } from './dto/update-authorization.dto';
import { USER_FIELDS } from '../utils/constants';

@Injectable()
export class AuthorizationService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  create(createAuthorizationDto: CreateAuthorizationDto) {
    return 'This action adds a new authorization';
  }

  generateToken(email: string) {
    const secret = this.configService.get('JWT_SECRET');
    return this.jwtService.sign({ email }, { secret });
  }

  async createLink(token: string) {
    const clientUrl = this.configService.get('CLIENT_URL');
    const link = `${clientUrl}/auth/${token}`;
    return `<p><a href="${link}">Войти в аккаунт</a></p>`;
  }

  async findUserByToken(email: string, password: string) {
    return this.userModel.find({
      [USER_FIELDS.EMAIL]: email,
      [USER_FIELDS.PASSWORD]: password,
    });
  }

  findAll() {
    return `This action returns all authorization`;
  }

  findOne(id: string) {
    return `This action returns a #${id} authorization`;
  }

  update(id: string, updateAuthorizationDto: UpdateAuthorizationDto) {
    return `This action updates a #${id} authorization`;
  }

  deleteById(id: string) {
    return `This action removes a #${id} authorization`;
  }
}
