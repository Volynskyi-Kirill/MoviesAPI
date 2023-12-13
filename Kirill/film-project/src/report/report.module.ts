import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ReportService } from './report.service';
import { ReportController } from './report.controller';
import { Report, ReportSchema } from './schemas/report.schema';
import { Movie, MovieSchema } from '../movie/schemas/movie.schema';
import { User, UserSchema } from '../user/schemas/user.schema';
import { Playlist, PlaylistSchema } from '../playlist/schemas/playlist.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Report.name, schema: ReportSchema },
      { name: Movie.name, schema: MovieSchema },
      { name: User.name, schema: UserSchema },
      { name: Playlist.name, schema: PlaylistSchema },
    ]),
  ],
  controllers: [ReportController],
  providers: [ReportService],
})
export class ReportModule {}
