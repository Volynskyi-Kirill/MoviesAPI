import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../user/schemas/user.schema';
import { USER_FIELDS } from '../utils/constants';
import { Permissions } from '../utils/enum/permissions.enum';
import { RolePermissions } from '../utils/enum/rolePermissions.enum';

@Injectable()
export class AuthorizationService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  generateToken(id: string, email: string, roles: string[]) {
    const secret = this.configService.get('JWT_SECRET');
    return this.jwtService.sign({ id, email, roles }, { secret });
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

  can(user: UserDocument, permissions: Permissions) {
    const result = user.roles.some((role) =>
      RolePermissions[role].includes(permissions),
    );
    if (!result) throw new ForbiddenException();
    return result;
  }
}
