import { Test, TestingModule } from '@nestjs/testing';
import { PlaylistController } from './playlist.controller';
import { PlaylistService } from './playlist.service';
import { UserService } from '../user/user.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Playlist,
  PlaylistSchema,
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
    service = module.get<PlaylistService>(PlaylistService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findPublic', () => {
    it(`${HTTPMethod.GET}, should return public playlist`, async () => {
      const result = [
        {
          _id: '65737124524ee19dfa37ba9e',
          title: 'плейлист 1',
          movies: ['6564b655f92cc1aeb84e5dea', '6564b663f92cc1aeb84e5dec'],
          createdBy: '65705c0906526fd8ef0eba13',
          visibility: 'public',
          __v: 0,
        },
      ];

      jest.spyOn(service, 'findPublic').mockImplementation(() => result as any);

      expect(await controller.findPublic()).toBe(result);
    });
  });
});
