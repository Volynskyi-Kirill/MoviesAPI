import { AuthorizationService } from '../authorization/authorization.service';
import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { HTTPMethod } from 'http-method-enum';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config/dist';
import {
  createUserDto,
  defaultUsername,
  updateUsername,
} from './fixtures/user.fixture';
import { DB_CONNECTION_URL } from '../../config';

describe('UserService', () => {
  let service: UserService;
  let authorizationService: AuthorizationService;

  async function createAndGetUserId(userDto = createUserDto()) {
    const token = authorizationService.generateToken(userDto.email);

    const createdUser = await service.create(userDto, token);
    return createdUser._id.toString();
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(DB_CONNECTION_URL),
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
      ],
      providers: [UserService, AuthorizationService, JwtService, ConfigService],
    }).compile();

    service = module.get<UserService>(UserService);
    authorizationService =
      module.get<AuthorizationService>(AuthorizationService);
  });

  afterEach(async () => {
    await service.deleteByUsername(defaultUsername);
    await service.deleteByUsername(updateUsername);
  });

  it(`${HTTPMethod.POST}, should create a user`, async () => {
    const userDto = createUserDto();
    const token = authorizationService.generateToken(userDto.email);
    const createdUser = await service.create(userDto, token);

    expect(createdUser).toEqual(expect.objectContaining(userDto));
  });

  it(`${HTTPMethod.GET}, should return all users`, async () => {
    const users = await service.findAll();

    expect(users).toBeInstanceOf(Array);
  });

  it(`${HTTPMethod.GET}, should return a user by id`, async () => {
    const userDto = createUserDto();
    const userId = await createAndGetUserId(userDto);
    const user = await service.findOne(userId);

    expect(user).toEqual(expect.objectContaining(userDto));
  });

  it(`${HTTPMethod.PUT}, should update a user by id`, async () => {
    const userId = await createAndGetUserId();
    const user = await service.update(userId, {
      username: updateUsername,
    });

    expect(user?.username).toEqual(updateUsername);
  });
});
