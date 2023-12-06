import mongoose from 'mongoose';

export class CreatePlaylistDto {
  title: string;
  movies: mongoose.Schema.Types.ObjectId[];
  created: mongoose.Schema.Types.ObjectId[];
  visibility: string;
}
