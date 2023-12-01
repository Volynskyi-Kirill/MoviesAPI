import { Test, TestingModule } from '@nestjs/testing';
import { GenreService } from './genre.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Genre, GenreSchema } from './schemas/genre.schema';
import { HTTPMethod } from 'http-method-enum';
import {
  createGenreDto,
  defaultGenre,
  updateGenre,
} from './fixtures/genre.fixture';
import { DB_CONNECTION_URL } from '../../config';

describe('GenreService', () => {
  let service: GenreService;

  async function createAndGetGenreId(genreDto = createGenreDto()) {
    const createdGenre = await service.create(genreDto);
    return createdGenre._id.toString();
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(DB_CONNECTION_URL),
        MongooseModule.forFeature([{ name: Genre.name, schema: GenreSchema }]),
      ],
      providers: [GenreService],
    }).compile();

    service = module.get<GenreService>(GenreService);
  });

  afterEach(async () => {
    await service.deleteByGenre(defaultGenre);
    await service.deleteByGenre(updateGenre);
  });

  it(`${HTTPMethod.POST}, should create a genre`, async () => {
    const genreDto = createGenreDto();
    const createdGenre = await service.create(genreDto);

    expect(createdGenre).toEqual(expect.objectContaining(genreDto));
  });

  it(`${HTTPMethod.GET}, should return all genres`, async () => {
    const genres = await service.findAll();

    expect(genres).toBeInstanceOf(Array);
  });

  it(`${HTTPMethod.GET}, should return a genre by id`, async () => {
    const genreDto = createGenreDto();
    const genreId = await createAndGetGenreId(genreDto);
    const genre = await service.findOne(genreId);

    expect(genre).toEqual(expect.objectContaining(genreDto));
  });

  it(`${HTTPMethod.PUT}, should update a genre by id`, async () => {
    const genreId = await createAndGetGenreId();
    const genre = await service.update(genreId, {
      genre: updateGenre,
    });

    expect(genre?.genre).toEqual(updateGenre);
  });
});
