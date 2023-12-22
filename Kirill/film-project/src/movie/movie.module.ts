import { Module } from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Movie, MovieSchema } from './schemas/movie.schema';
import { Genre, GenreSchema } from '../genre/schemas/genre.schema';
import { Director, DirectorSchema } from '../director/schemas/director.schema';
import { User, UserSchema } from '../user/schemas/user.schema';

@Module({
  imports: [
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
    JwtService,
    ConfigService,
  ],
})
export class MovieModule {}
