import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { AddMoviePlaylistDto } from './dto/add-movie-playlist.dto';
import { DeleteMoviePlaylistDto } from './dto/delete-movie-playlist.dto';
import { Playlist, PlaylistDocument } from './schemas/playlist.schema';
import {
  PLAYLIST_FIELDS,
  VISIBILITY_OPTIONS,
  USER_FIELDS,
} from '../utils/constants';

const POPULATE_PARAMS = {
  CREATED_BY: {
    path: PLAYLIST_FIELDS.CREATED_BY,
    select: `${USER_FIELDS.EMAIL} ${USER_FIELDS.USERNAME} -${USER_FIELDS.ID}`,
  },
};

@Injectable()
export class PlaylistService {
  constructor(
    @InjectModel(Playlist.name) private playlistModel: Model<PlaylistDocument>,
  ) {}
  async create(createPlaylistDto: CreatePlaylistDto) {
    return await this.playlistModel.create(createPlaylistDto);
  }

  async updateEntriesCount(id: string, value: number) {
    return await this.playlistModel.findByIdAndUpdate(id, {
      $inc: { entriesCount: value },
    });
  }

  async findAll() {
    return await this.playlistModel.find().populate(POPULATE_PARAMS.CREATED_BY);
  }

  async findPublic() {
    return await this.playlistModel
      .find({
        [PLAYLIST_FIELDS.VISIBILITY]: VISIBILITY_OPTIONS.PUBLIC,
      })
      .populate(POPULATE_PARAMS.CREATED_BY);
  }

  async findByUser(createdBy: string) {
    return await this.playlistModel
      .find({
        [PLAYLIST_FIELDS.CREATED_BY]: createdBy,
      })
      .populate(POPULATE_PARAMS.CREATED_BY);
  }

  async findOne(id: string) {
    return await this.playlistModel
      .findById(id)
      .populate(POPULATE_PARAMS.CREATED_BY);
  }

  async findById(id: string) {
    return await this.playlistModel.findById(id);
  }

  async update(id: string, updatePlaylistDto: UpdatePlaylistDto) {
    return await this.playlistModel.findByIdAndUpdate(id, updatePlaylistDto, {
      new: true,
    });
  }

  async addMovie(playlistId: string, addMoviePlaylistDto: AddMoviePlaylistDto) {
    const movieId = addMoviePlaylistDto.movies;
    await this.playlistModel.findByIdAndUpdate(playlistId, {
      $addToSet: { [PLAYLIST_FIELDS.MOVIES]: movieId },
    });
  }

  async deleteMovie(
    playlistId: string,
    deleteMoviePlaylistDto: DeleteMoviePlaylistDto,
  ) {
    const movieId = deleteMoviePlaylistDto.movies;
    return await this.playlistModel.findByIdAndUpdate(playlistId, {
      $pull: { [PLAYLIST_FIELDS.MOVIES]: movieId },
    });
  }

  async remove(id: string) {
    return await this.playlistModel.findByIdAndDelete(id);
  }

  async deleteByPlaylist(title: string) {
    return await this.playlistModel.deleteMany({ title });
  }
}
