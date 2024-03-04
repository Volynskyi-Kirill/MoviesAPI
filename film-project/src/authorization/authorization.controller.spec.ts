import { Test, TestingModule } from '@nestjs/testing';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthorizationController } from './authorization.controller';
import { AuthorizationService } from './authorization.service';
import { User, UserSchema } from '../user/schemas/user.schema';
import { DB_CONNECTION_URL } from '../../config';
import { PassportModule } from '@nestjs/passport/dist';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { ConfigService } from '@nestjs/config';
import { UserService } from '../user/user.service';
import { MailService } from '../mail/mail.service';

describe('AuthorizationController', () => {
  let controller: AuthorizationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(DB_CONNECTION_URL),
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        PassportModule,
        JwtModule,
      ],
      controllers: [AuthorizationController],
      providers: [
        AuthorizationService,
        JwtService,
        JwtStrategy,
        ConfigService,
        UserService,
        MailService,
      ],
    }).compile();

    controller = module.get<AuthorizationController>(AuthorizationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
