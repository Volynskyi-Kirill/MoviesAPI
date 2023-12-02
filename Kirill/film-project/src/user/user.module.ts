import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { AuthorizationService } from 'src/authorization/authorization.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config/dist';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [UserService, AuthorizationService, JwtService, ConfigService],
})
export class UserModule {}
