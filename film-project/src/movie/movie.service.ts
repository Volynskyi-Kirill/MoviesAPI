import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Movie, MovieDocument } from './schemas/movie.schema';
import { Genre, GenreDocument } from '../genre/schemas/genre.schema';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { MOVIE_FIELDS } from '../utils/constants';

@Injectable()
export class MovieService {
  constructor(
    @InjectModel(Movie.name) private movieModel: Model<MovieDocument>,
    @InjectModel(Genre.name) private genreModel: Model<GenreDocument>,
  ) {}

  POPULATE_PARAMS = {
    GENRE: {
      path: MOVIE_FIELDS.GENRE,
      model: this.genreModel,
    },
    DIRECTOR: {
      path: MOVIE_FIELDS.DIRECTOR,
    },
  };

  async create(createMovieDto: CreateMovieDto) {
    return await this.movieModel.create(createMovieDto);
  }

  async findAll() {
    return await this.movieModel
      .find()
      .populate(this.POPULATE_PARAMS.GENRE)
      .populate(this.POPULATE_PARAMS.DIRECTOR);
  }

  async findMoviesTitle() {
    return await this.movieModel.find({}, { [MOVIE_FIELDS.TITLE]: 1 });
  }

  async findOne(id: string) {
    return await this.movieModel
      .findById(id)
      .populate(this.POPULATE_PARAMS.GENRE)
      .populate(this.POPULATE_PARAMS.DIRECTOR);
  }

  async update(id: string, updateMovieDto: UpdateMovieDto) {
    return await this.movieModel.findByIdAndUpdate(id, updateMovieDto, {
      new: true,
    });
  }

  async deleteGenreFromMovies(
    genreId: string,
    session: mongoose.mongo.ClientSession,
  ) {
    return await this.movieModel.updateMany(
      {},
      { $pull: { genre: genreId } },
      { session },
    );
  }

  async deleteById(id: string) {
    return await this.movieModel.findByIdAndDelete(id);
  }

  async deleteByTitle(title: string) {
    return await this.movieModel.deleteMany({ title });
  }
}
