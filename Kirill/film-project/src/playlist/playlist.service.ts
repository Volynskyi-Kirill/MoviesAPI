import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { AddMoviePlaylistDto } from './dto/add-movie-playlist.dto';
import { DeleteMoviePlaylistDto } from './dto/delete-movie-playlist.dto';
import { Playlist, PlaylistDocument } from './schemas/playlist.schema';
import { PLAYLIST_FIELDS } from '../utils/constants';

@Injectable()
export class PlaylistService {
  constructor(
    @InjectModel(Playlist.name) private playlistModel: Model<PlaylistDocument>,
  ) {}
  async create(createPlaylistDto: CreatePlaylistDto) {
    return await this.playlistModel.create(createPlaylistDto);
  }

  async findAll() {
    return await this.playlistModel.find();
  }

  async findOne(id: string) {
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
