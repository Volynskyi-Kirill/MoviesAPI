import { Test, TestingModule } from '@nestjs/testing';
import { DirectorService } from './director.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Director, DirectorSchema } from './schemas/director.schema';
import { HTTPMethod } from 'http-method-enum';
import {
  createDirectorDto,
  defaultName,
  updateName,
} from './fixtures/director.fixture';
import { DB_CONNECTION_URL } from '../../config';

describe('DirectorService', () => {
  let service: DirectorService;

  async function createAndGetDirectorId(directorDto = createDirectorDto()) {
    const createdDirector = await service.create(directorDto);
    return createdDirector._id.toString();
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(DB_CONNECTION_URL),
        MongooseModule.forFeature([
          { name: Director.name, schema: DirectorSchema },
        ]),
      ],
      providers: [DirectorService],
    }).compile();

    service = module.get<DirectorService>(DirectorService);
  });

  afterEach(async () => {
    await service.deleteByName(defaultName);
    await service.deleteByName(updateName);
  });

  it(`${HTTPMethod.POST}, should create a director`, async () => {
    const directorDto = createDirectorDto();
    const createdDirector = await service.create(directorDto);

    expect(createdDirector).toEqual(expect.objectContaining(directorDto));
  });

  it(`${HTTPMethod.GET}, should return all directors`, async () => {
    const directors = await service.findAll();

    expect(directors).toBeInstanceOf(Array);
  });

  it(`${HTTPMethod.GET}, should return a director by id`, async () => {
    const directorDto = createDirectorDto();
    const directorId = await createAndGetDirectorId(directorDto);
    const director = await service.findOne(directorId);

    expect(director).toEqual(expect.objectContaining(directorDto));
  });

  it(`${HTTPMethod.PUT}, should update a director by id`, async () => {
    const directorId = await createAndGetDirectorId();
    const director = await service.update(directorId, {
      name: updateName,
    });

    expect(director?.name).toEqual(updateName);
  });
});
