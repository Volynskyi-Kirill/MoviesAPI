import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Genre, GenreDocument } from './schemas/genre.schema';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';

@Injectable()
export class GenreService {
  constructor(
    @InjectModel(Genre.name) private genreModel: Model<GenreDocument>,
  ) {}

  async create(createGenreDto: CreateGenreDto) {
    return await this.genreModel.create(createGenreDto);
  }

  async findAll() {
    return await this.genreModel.find();
  }

  async findOne(id: string) {
    return await this.genreModel.findById(id);
  }

  async update(id: string, updateGenreDto: UpdateGenreDto) {
    return await this.genreModel.findByIdAndUpdate(id, updateGenreDto, {
      new: true,
    });
  }

  async deleteById(id: string, session: mongoose.mongo.ClientSession) {
    return await this.genreModel.findByIdAndDelete(id, { session });
  }

  async deleteByGenre(genre: string) {
    return await this.genreModel.deleteMany({ genre });
  }
}
