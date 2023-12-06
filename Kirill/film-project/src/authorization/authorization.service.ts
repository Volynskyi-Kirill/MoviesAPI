import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../user/schemas/user.schema';
import { CreateAuthorizationDto } from './dto/create-authorization.dto';
import { UpdateAuthorizationDto } from './dto/update-authorization.dto';
import { USER_FIELDS, ERROR_MESSAGE } from '../utils/constants';

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

  async loginUser(createAuthorizationDto: CreateAuthorizationDto) {
    const { email, password } = createAuthorizationDto;

    const user = await this.userModel.find({
      [USER_FIELDS.EMAIL]: email,
    });

    if (!user.length) throw new Error(ERROR_MESSAGE.USER_NOT_FOUND);

    const userPassword = user[0].password;
    return userPassword === password
      ? `${email} ${password}`
      : ERROR_MESSAGE.LOGIN_FAILED;
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

  remove(id: string) {
    return `This action removes a #${id} authorization`;
  }
}
