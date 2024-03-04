import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Playlist } from '../../playlist/schemas/playlist.schema';
import { ROLES } from '../../utils/constants';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, unique: true })
  username: string;

  @Prop({
    required: true,
    type: [{ type: String, enum: Object.values(ROLES) }],
  })
  roles: string[];

  @Prop({ required: true })
  password: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Playlist' }] })
  playlist: Playlist[];

  @Prop()
  token: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
