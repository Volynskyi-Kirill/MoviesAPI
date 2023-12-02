import { Test, TestingModule } from '@nestjs/testing';
import { MovieController } from './movie.controller';
import { MovieService } from './movie.service';
import { AuthorizationService } from '../authorization/authorization.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Movie, MovieSchema } from './schemas/movie.schema';
import { Genre, GenreSchema } from '../genre/schemas/genre.schema';
import { Director, DirectorSchema } from '../director/schemas/director.schema';
import { User, UserSchema } from '../user/schemas/user.schema';
import { DB_CONNECTION_URL } from '../../config';

describe('MovieController', () => {
  let controller: MovieController;

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
      controllers: [MovieController],
      providers: [
        MovieService,
        AuthorizationService,
        JwtService,
        ConfigService,
      ],
    }).compile();

    controller = module.get<MovieController>(MovieController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
