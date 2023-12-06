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
import { PlaylistModule } from './playlist/playlist.module';

const globalGuard = {
  provide: APP_GUARD,
  useClass: JwtGuard,
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
  ],
  controllers: [AppController],
  providers: [AppService, globalGuard],
})
export class AppModule {}
