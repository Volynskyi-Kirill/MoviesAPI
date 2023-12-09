import { Test, TestingModule } from '@nestjs/testing';
import { PlaylistController } from './playlist.controller';
import { PlaylistService } from './playlist.service';
import { UserService } from '../user/user.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Playlist,
  PlaylistSchema,
  PlaylistDocument,
} from './schemas/playlist.schema';
import { User, UserSchema } from '../user/schemas/user.schema';
import { DB_CONNECTION_URL } from '../../config';
import { HTTPMethod } from 'http-method-enum';

describe('PlaylistController', () => {
  let controller: PlaylistController;
  let service: PlaylistService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(DB_CONNECTION_URL),
        MongooseModule.forFeature([
          { name: Playlist.name, schema: PlaylistSchema },
          { name: User.name, schema: UserSchema },
        ]),
      ],
      controllers: [PlaylistController],
      providers: [PlaylistService, UserService],
    }).compile();

    controller = module.get<PlaylistController>(PlaylistController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findPublic', () => {
    it(`${HTTPMethod.GET}, should return public playlist`, async () => {
      const result = ['test'];
      jest.spyOn(service, 'findPublic').mockImplementation(() => result);

      expect(await controller.findPublic()).toBe(result);
    });
  });
});
