import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport/dist';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { User, UserSchema } from '../user/schemas/user.schema';
import { AuthorizationService } from './authorization.service';
import { AuthorizationController } from './authorization.controller';
import { JwtStrategy } from './jwt.strategy';
import { UserService } from 'src/user/user.service';

@Module({
  imports: [
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
  ],
})
export class AuthorizationModule {}
