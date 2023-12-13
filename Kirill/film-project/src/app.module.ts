import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MovieModule } from './movie/movie.module';
import { GenreModule } from './genre/genre.module';
import { DirectorModule } from './director/director.module';
import { UserModule } from './user/user.module';
import { DB_CONNECTION_URL } from '../config';
import { AuthorizationModule } from './authorization/authorization.module';
import { JwtGuard } from './authorization/guards/jwt.guard';
import { RolesGuard } from './authorization/guards/roles.guard';
import { OwnerGuard } from './authorization/guards/owner.guard';
import { PlaylistModule } from './playlist/playlist.module';
import { ReportModule } from './report/report.module';

const jwtGuard = {
  provide: APP_GUARD,
  useClass: JwtGuard,
};

const rolesGuard = {
  provide: APP_GUARD,
  useClass: RolesGuard,
};

const ownerGuard = {
  provide: APP_GUARD,
  useClass: OwnerGuard,
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
  ],
  controllers: [AppController],
  providers: [AppService, jwtGuard, rolesGuard, ownerGuard],
})
export class AppModule {}
