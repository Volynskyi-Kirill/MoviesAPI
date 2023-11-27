import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Director, DirectorDocument } from './schemas/director.schema';
import { CreateDirectorDto } from './dto/create-director.dto';
import { UpdateDirectorDto } from './dto/update-director.dto';

@Injectable()
export class DirectorService {
  constructor(
    @InjectModel(Director.name) private movieModel: Model<DirectorDocument>,
  ) {}
  async create(createDirectorDto: CreateDirectorDto) {
    return await this.movieModel.create(createDirectorDto);
  }

  async findAll() {
    return await this.movieModel.find();
  }

  async findOne(id: string) {
    return await this.movieModel.findById(id);
  }

  async update(id: string, updateDirectorDto: UpdateDirectorDto) {
    return await this.movieModel.findByIdAndUpdate(id, updateDirectorDto, {
      new: true,
    });
  }

  async remove(id: string) {
    return await this.movieModel.findByIdAndDelete(id);
  }

  async deleteByName(name: string) {
    return await this.movieModel.deleteMany({ name });
  }
}
