import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { MovieModule } from './movie/movie.module';
import { GenreModule } from './genre/genre.module';
import { DirectorModule } from './director/director.module';
import { UserModule } from './user/user.module';
import { DB_CONNECTION_URL } from '../config';
import { AuthorizationModule } from './authorization/authorization.module';
import { JwtGuard } from './authorization/guards/jwt.guard';
import { RolesGuard } from './authorization/guards/roles.guard';
import { PlaylistModule } from './playlist/playlist.module';
import { ReportModule } from './report/report.module';
import { MailModule } from './mail/mail.module';

const jwtGuard = {
  provide: APP_GUARD,
  useClass: JwtGuard,
};

const rolesGuard = {
  provide: APP_GUARD,
  useClass: RolesGuard,
};

@Module({
  imports: [
    MongooseModule.forRoot(DB_CONNECTION_URL),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MovieModule,
    GenreModule,
    DirectorModule,
    AuthorizationModule,
    UserModule,
    PlaylistModule,
    ReportModule,
    MailModule,
  ],
  providers: [jwtGuard, rolesGuard],
})
export class AppModule {}
