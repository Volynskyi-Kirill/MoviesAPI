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

describe('DirectorService', () => {
  let service: DirectorService;

  async function createAndGetDirectorId(directorDto = createDirectorDto()) {
    const createdDirector = await service.create(directorDto);
    return createdDirector._id.toString();
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot('mongodb://127.0.0.1:27017/directors'),
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

    expect(createdDirector.name).toEqual(directorDto.name);
    expect(createdDirector.dateOfBirth).toEqual(directorDto.dateOfBirth);
  });

  it(`${HTTPMethod.GET}, should return all directors`, async () => {
    const directors = await service.findAll();

    expect(directors).toBeInstanceOf(Array);
  });

  it(`${HTTPMethod.GET}, should return a director by id`, async () => {
    const directorDto = createDirectorDto();
    const directorId = await createAndGetDirectorId(directorDto);
    const director = await service.findOne(directorId);

    expect(director?.name).toEqual(directorDto.name);
  });

  it(`${HTTPMethod.PUT}, should update a director by id`, async () => {
    const directorId = await createAndGetDirectorId();
    const director = await service.update(directorId, {
      name: updateName,
    });

    expect(director?.name).toEqual(updateName);
  });
});
