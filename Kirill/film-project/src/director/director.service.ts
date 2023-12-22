import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Director, DirectorDocument } from './schemas/director.schema';
import { CreateDirectorDto } from './dto/create-director.dto';
import { UpdateDirectorDto } from './dto/update-director.dto';

@Injectable()
export class DirectorService {
  constructor(
    @InjectModel(Director.name) private directorModel: Model<DirectorDocument>,
  ) {}
  async create(createDirectorDto: CreateDirectorDto) {
    return await this.directorModel.create(createDirectorDto);
  }

  async findAll() {
    return await this.directorModel.find();
  }

  async findOne(id: string) {
    return await this.directorModel.findById(id);
  }

  async update(id: string, updateDirectorDto: UpdateDirectorDto) {
    return await this.directorModel.findByIdAndUpdate(id, updateDirectorDto, {
      new: true,
    });
  }

  async deleteById(id: string) {
    return await this.directorModel.findByIdAndDelete(id);
  }

  async deleteByName(name: string) {
    return await this.directorModel.deleteMany({ name });
  }
}
