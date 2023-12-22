import { Test, TestingModule } from '@nestjs/testing';
import { ReportController } from './report.controller';
import { ReportService } from './report.service';
import { MongooseModule } from '@nestjs/mongoose';
import { DB_CONNECTION_URL } from '../../config';
import { Report, ReportSchema } from './schemas/report.schema';
import { Movie, MovieSchema } from '../movie/schemas/movie.schema';
import { User, UserSchema } from '../user/schemas/user.schema';
import { Playlist, PlaylistSchema } from '../playlist/schemas/playlist.schema';

describe('ReportController', () => {
  let controller: ReportController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(DB_CONNECTION_URL),
        MongooseModule.forFeature([
          { name: Report.name, schema: ReportSchema },
          { name: Movie.name, schema: MovieSchema },
          { name: User.name, schema: UserSchema },
          { name: Playlist.name, schema: PlaylistSchema },
        ]),
      ],
      controllers: [ReportController],
      providers: [ReportService],
    }).compile();

    controller = module.get<ReportController>(ReportController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
