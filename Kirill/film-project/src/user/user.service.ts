import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateUserProfileDto } from './dto/update-user-profile.dto';
import { USER_FIELDS } from '../utils/constants';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto, token: string) {
    const userToCreate = { ...createUserDto, token };
    return await this.userModel.create(userToCreate);
  }

  async findAll() {
    return await this.userModel.find();
  }

  async findOne(id: string) {
    return await this.userModel.findById(id);
  }

  async findByEmail(email: string) {
    return await this.userModel.find({ email });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return await this.userModel.findByIdAndUpdate(id, updateUserDto, {
      new: true,
    });
  }

  async addPlaylist(id: string, playlistId: string) {
    return await this.userModel.findByIdAndUpdate(id, {
      $push: { [USER_FIELDS.PLAYLIST]: playlistId },
    });
  }

  //TODO оставить только update, сделать сервис для обновления roles для админов
  async updateProfile(id: string, updateUserProfileDto: UpdateUserProfileDto) {
    return await this.userModel.findByIdAndUpdate(id, updateUserProfileDto, {
      new: true,
    });
  }

  async remove(id: string) {
    return await this.userModel.findByIdAndDelete(id);
  }

  async deletePlaylist(id: string, playlistId: string) {
    return await this.userModel.findByIdAndUpdate(id, {
      $pull: { [USER_FIELDS.PLAYLIST]: playlistId },
    });
  }

  async deleteByUsername(username: string) {
    return await this.userModel.deleteMany({ username });
  }
}
