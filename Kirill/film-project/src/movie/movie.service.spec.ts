import { Test, TestingModule } from '@nestjs/testing';
import { MovieService } from './movie.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Movie, MovieSchema } from './schemas/movie.schemas';

describe('MovieService', () => {
  let service: MovieService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot('mongodb://127.0.0.1:27017/movies'),
        MongooseModule.forFeature([{ name: Movie.name, schema: MovieSchema }]),
      ],
      providers: [MovieService],
    }).compile();

    service = module.get<MovieService>(MovieService);
  });

  afterEach(async () => {
    await service.deleteMany('test');
  });

  it('should create a movie', async () => {
    const createMovieDto = {
      title: 'test',
      year: 2021,
      duration: 65,
    };
    const createMovie = await service.create(createMovieDto);

    expect(createMovie.title).toEqual(createMovieDto.title);
  });
});
