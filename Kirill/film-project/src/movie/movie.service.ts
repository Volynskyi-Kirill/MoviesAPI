import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Movie, MovieDocument } from './schemas/movie.schemas';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Injectable()
export class MovieService {
  constructor(
    @InjectModel(Movie.name) private movieModel: Model<MovieDocument>,
  ) {}

  async create(createMovieDto: CreateMovieDto): Promise<Movie> {
    const createMovie = await this.movieModel.create(createMovieDto);
    return createMovie;
  }

  async findAll(): Promise<Movie[]> {
    return await this.movieModel.find();
  }

  async findOne(id: string): Promise<Movie | null> {
    return await this.movieModel.findById(id);
  }

  async update(
    id: string,
    updateMovieDto: UpdateMovieDto,
  ): Promise<Movie | null> {
    return await this.movieModel.findByIdAndUpdate(id, updateMovieDto);
  }

  async remove(id: string): Promise<Movie | null> {
    return await this.movieModel.findByIdAndDelete(id);
  }

  async deleteMany(title: string) {
    return await this.movieModel.deleteMany({ title });
  }
}
