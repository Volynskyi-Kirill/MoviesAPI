import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ReportDocument = HydratedDocument<Report>;

@Schema()
export class Report {
  @Prop({ required: true })
  films: number;

  @Prop({ required: true })
  playlists: number;

  @Prop({ required: true })
  users: number;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const ReportSchema = SchemaFactory.createForClass(Report);
