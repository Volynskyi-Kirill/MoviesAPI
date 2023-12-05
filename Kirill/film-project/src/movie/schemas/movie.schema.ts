import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Genre } from '../../genre/schemas/genre.schema';
import { Director } from '../../director/schemas/director.schema';

export type MovieDocument = HydratedDocument<Movie>;

@Schema()
export class Movie {
  @Prop({ required: true, unique: true })
  title: string;

  @Prop({ required: true })
  year: number;

  @Prop({ required: true })
  duration: number;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Genre' }] })
  genre: Genre[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Director' }] })
  director: Director[];
}

export const MovieSchema = SchemaFactory.createForClass(Movie);
