import { Test, TestingModule } from '@nestjs/testing';
import { GenreController } from './genre.controller';
import { GenreService } from './genre.service';
import { MovieService } from '../movie/movie.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Genre, GenreSchema } from './schemas/genre.schema';
import { Movie, MovieSchema } from '../movie/schemas/movie.schema';
import { DB_CONNECTION_URL } from '../../config';

describe('GenreController', () => {
  let controller: GenreController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(DB_CONNECTION_URL),
        MongooseModule.forFeature([
          { name: Genre.name, schema: GenreSchema },
          { name: Movie.name, schema: MovieSchema },
        ]),
      ],
      controllers: [GenreController],
      providers: [GenreService, MovieService],
    }).compile();

    controller = module.get<GenreController>(GenreController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
