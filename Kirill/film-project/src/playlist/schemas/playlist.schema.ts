import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Movie } from '../../movie/schemas/movie.schema';
import { User } from '../../user/schemas/user.schema';
import { VISIBILITY_OPTIONS } from '../../utils/constants';

export type PlaylistDocument = HydratedDocument<Playlist>;

@Schema()
export class Playlist {
  @Prop({ required: true })
  title: string;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }],
    required: true,
  })
  movies: Movie[];

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  })
  createdBy: User;

  @Prop({
    type: String,
    enum: Object.values(VISIBILITY_OPTIONS),
    default: VISIBILITY_OPTIONS.PRIVATE,
  })
  visibility: string;

  @Prop({ default: 0 })
  entriesCount: number;
}

export const PlaylistSchema = SchemaFactory.createForClass(Playlist);
