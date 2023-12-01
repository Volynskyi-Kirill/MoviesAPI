import { Module } from '@nestjs/common';
import { MovieService } from './movie.service';
import { AuthorizationService } from '../authorization/authorization.service';
import { MovieController } from './movie.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Movie, MovieSchema } from './schemas/movie.schema';
import { Genre, GenreSchema } from '../genre/schemas/genre.schema';
import { Director, DirectorSchema } from '../director/schemas/director.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Movie.name, schema: MovieSchema },
      { name: Genre.name, schema: GenreSchema },
      { name: Director.name, schema: DirectorSchema },
    ]),
  ],
  controllers: [MovieController],
  providers: [MovieService, AuthorizationService],
})
export class MovieModule {}
