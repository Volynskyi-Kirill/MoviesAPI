import { Test, TestingModule } from '@nestjs/testing';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthorizationController } from './authorization.controller';
import { AuthorizationService } from './authorization.service';
import { User, UserSchema } from '../user/schemas/user.schema';
import { DB_CONNECTION_URL } from '../../config';

describe('AuthorizationController', () => {
  let controller: AuthorizationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(DB_CONNECTION_URL),
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
      ],
      controllers: [AuthorizationController],
      providers: [AuthorizationService],
    }).compile();

    controller = module.get<AuthorizationController>(AuthorizationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
