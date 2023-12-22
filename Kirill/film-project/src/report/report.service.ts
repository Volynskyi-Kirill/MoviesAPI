import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { Report, ReportDocument } from './schemas/report.schema';
import { Movie, MovieDocument } from '../movie/schemas/movie.schema';
import { User, UserDocument } from '../user/schemas/user.schema';
import {
  Playlist,
  PlaylistDocument,
} from '../playlist/schemas/playlist.schema';

@Injectable()
export class ReportService {
  constructor(
    @InjectModel(Report.name) private reportModel: Model<ReportDocument>,
    @InjectModel(Movie.name) private movieModel: Model<MovieDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Playlist.name) private playlistModel: Model<PlaylistDocument>,
  ) {}
  create(createReportDto: CreateReportDto) {
    return this.reportModel.create(createReportDto);
  }

  findAll() {
    return `This action returns all report`;
  }

  findOne(id: string) {
    return `This action returns a #${id} report`;
  }

  update(id: string, updateReportDto: UpdateReportDto) {
    return `This action updates a #${id} report`;
  }

  deleteById(id: string) {
    return `This action removes a #${id} report`;
  }

  async makeReport() {
    const films = await this.movieModel.countDocuments();
    const playlists = await this.playlistModel.countDocuments();
    const users = await this.userModel.countDocuments();

    return {
      films,
      playlists,
      users,
    };
  }
}
