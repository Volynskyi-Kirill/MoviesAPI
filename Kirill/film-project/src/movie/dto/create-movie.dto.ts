import mongoose from 'mongoose';

export class CreateMovieDto {
  title: string;
  year: number;
  duration: number;
  genre: mongoose.Schema.Types.ObjectId[];
  director: mongoose.Schema.Types.ObjectId[];
}
