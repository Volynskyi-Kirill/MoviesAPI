import { Test, TestingModule } from '@nestjs/testing';
import { MovieService } from './movie.service';
import { AuthorizationService } from '../authorization/authorization.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Movie, MovieSchema } from './schemas/movie.schema';
import { Genre, GenreSchema } from '../genre/schemas/genre.schema';
import { Director, DirectorSchema } from '../director/schemas/director.schema';
import { User, UserSchema } from '../user/schemas/user.schema';
import { HTTPMethod } from 'http-method-enum';
import {
  createMovieDto,
  defaultTitle,
  updateTitle,
} from './fixtures/movie.fixture';
import { DB_CONNECTION_URL } from '../../config';

describe('MovieService', () => {
  let service: MovieService;

  async function createAndGetMovieId(movieDto = createMovieDto()) {
    const createdMovie = await service.create(movieDto);
    return createdMovie._id.toString();
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(DB_CONNECTION_URL),
        MongooseModule.forFeature([
          { name: Movie.name, schema: MovieSchema },
          { name: Genre.name, schema: GenreSchema },
          { name: Director.name, schema: DirectorSchema },
          { name: User.name, schema: UserSchema },
        ]),
      ],
      providers: [MovieService, AuthorizationService],
    }).compile();

    service = module.get<MovieService>(MovieService);
  });

  afterEach(async () => {
    await service.deleteByTitle(defaultTitle);
    await service.deleteByTitle(updateTitle);
  });
  it(`${HTTPMethod.POST}, should create a movie`, async () => {
    const movieDto = createMovieDto();
    const createdMovie = await service.create(movieDto);

    expect(createdMovie).toEqual(expect.objectContaining(movieDto));
  });

  it(`${HTTPMethod.GET}, should return all movies`, async () => {
    const movies = await service.findAll();

    expect(movies).toBeInstanceOf(Array);
  });

  it(`${HTTPMethod.GET}, should return a movie by id`, async () => {
    const movieDto = createMovieDto();
    const movieId = await createAndGetMovieId(movieDto);
    const movie = await service.findOne(movieId);

    expect(movie?.title).toEqual(movieDto.title);
  });

  it(`${HTTPMethod.PUT}, should update a movie by id`, async () => {
    const movieId = await createAndGetMovieId();
    const movie = await service.update(movieId, {
      title: updateTitle,
    });

    expect(movie?.title).toEqual(updateTitle);
  });
});
