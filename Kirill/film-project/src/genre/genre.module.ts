import { Module } from '@nestjs/common';
import { GenreService } from './genre.service';
import { MovieService } from '../movie/movie.service';
import { GenreController } from './genre.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Genre, GenreSchema } from './schemas/genre.schema';
import { Movie, MovieSchema } from '../movie/schemas/movie.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Genre.name, schema: GenreSchema },
      { name: Movie.name, schema: MovieSchema },
    ]),
  ],
  controllers: [GenreController],
  // providers: [GenreService],
  providers: [GenreService, MovieService],
})
export class GenreModule {}
