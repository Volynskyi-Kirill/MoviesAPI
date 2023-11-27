import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { HTTPMethod } from 'http-method-enum';
import {
  createUserDto,
  defaultUsername,
  updateUsername,
} from './fixtures/user.fixture';

describe('UserService', () => {
  let service: UserService;

  async function createAndGetUserId(userDto = createUserDto()) {
    const createdUser = await service.create(userDto);
    return createdUser._id.toString();
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot('mongodb://127.0.0.1:27017/movies'),
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
      ],
      providers: [UserService],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  afterEach(async () => {
    await service.deleteByUsername(defaultUsername);
    await service.deleteByUsername(updateUsername);
  });

  it(`${HTTPMethod.POST}, should create a user`, async () => {
    const userDto = createUserDto();
    const createdUser = await service.create(userDto);

    expect(createdUser.username).toEqual(userDto.username);
    expect(createdUser.mail).toEqual(userDto.mail);
  });

  it(`${HTTPMethod.GET}, should return all users`, async () => {
    const users = await service.findAll();

    expect(users).toBeInstanceOf(Array);
  });

  it(`${HTTPMethod.GET}, should return a user by id`, async () => {
    const userDto = createUserDto();
    const userId = await createAndGetUserId(userDto);
    const user = await service.findOne(userId);

    expect(user?.username).toEqual(userDto.username);
  });

  it(`${HTTPMethod.PUT}, should update a user by id`, async () => {
    const userId = await createAndGetUserId();
    const user = await service.update(userId, {
      username: updateUsername,
    });

    expect(user?.username).toEqual(updateUsername);
  });
});
