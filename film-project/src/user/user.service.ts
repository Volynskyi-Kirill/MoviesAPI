import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateUserProfileDto } from './dto/update-user-profile.dto';
import {
  USER_FIELDS,
  PLAYLIST_FIELDS,
  ERROR_MESSAGE,
} from '../utils/constants';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto) {
    return await this.userModel.create(createUserDto);
  }

  async findAll() {
    return await this.userModel.find();
  }

  async findOne(id: string) {
    return await this.userModel.findById(id);
  }

  async findByEmail(email: string) {
    const user = await this.userModel.findOne({ email });

    if (!user) throw new Error(ERROR_MESSAGE.USER_NOT_FOUND);

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return await this.userModel.findByIdAndUpdate(id, updateUserDto, {
      new: true,
    });
  }

  async findPlaylists(id: string) {
    return await this.userModel
      .findById(id, { [USER_FIELDS.PLAYLIST]: 1 })
      .populate({
        path: USER_FIELDS.PLAYLIST,
        populate: {
          path: PLAYLIST_FIELDS.CREATED_BY,
          select: USER_FIELDS.USERNAME,
        },
      });
  }

  async addPlaylist(id: string, playlistId: string) {
    return await this.userModel.findByIdAndUpdate(id, {
      $addToSet: { [USER_FIELDS.PLAYLIST]: playlistId },
    });
  }

  async updateProfile(id: string, updateUserProfileDto: UpdateUserProfileDto) {
    return await this.userModel.findByIdAndUpdate(id, updateUserProfileDto, {
      new: true,
    });
  }

  async deleteById(id: string) {
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
