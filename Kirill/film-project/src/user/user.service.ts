import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private movieModel: Model<UserDocument>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    return await this.movieModel.create(createUserDto);
  }

  async findAll() {
    return await this.movieModel.find();
  }

  async findOne(id: string) {
    return await this.movieModel.findById(id);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return await this.movieModel.findByIdAndUpdate(id, updateUserDto, {
      new: true,
    });
  }

  async remove(id: string) {
    return await this.movieModel.findByIdAndDelete(id);
  }

  async deleteByUsername(username: string) {
    return await this.movieModel.deleteMany({ username });
  }
}
