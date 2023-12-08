import mongoose from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMovieDto {
  @ApiProperty()
  title: string;
  @ApiProperty()
  year: number;
  @ApiProperty()
  duration: number;
  @ApiProperty()
  genre: mongoose.Schema.Types.ObjectId[];
  @ApiProperty()
  director: mongoose.Schema.Types.ObjectId[];
}
