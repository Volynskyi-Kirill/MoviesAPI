import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Genre, GenreDocument } from './schemas/genre.schema';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';

@Injectable()
export class GenreService {
  constructor(
    @InjectModel(Genre.name) private movieModel: Model<GenreDocument>,
  ) {}

  async create(createGenreDto: CreateGenreDto) {
    return await this.movieModel.create(createGenreDto);
  }

  async findAll() {
    return await this.movieModel.find();
  }

  async findOne(id: string) {
    return await this.movieModel.findById(id);
  }

  async update(id: string, updateGenreDto: UpdateGenreDto) {
    return await this.movieModel.findByIdAndUpdate(id, updateGenreDto, {
      new: true,
    });
  }

  async remove(id: string) {
    return await this.movieModel.findByIdAndDelete(id);
  }

  async deleteByGenre(genre: string) {
    return await this.movieModel.deleteMany({ genre });
  }
}
