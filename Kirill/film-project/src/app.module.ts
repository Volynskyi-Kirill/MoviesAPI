import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MovieModule } from './movie/movie.module';
import { GenreModule } from './genre/genre.module';
import { DirectorModule } from './director/director.module';
import { UserModule } from './user/user.module';
import { DB_CONNECTION_URL } from '../config';
import { AuthorizationModule } from './authorization/authorization.module';

@Module({
  imports: [
    MongooseModule.forRoot(DB_CONNECTION_URL),
    MovieModule,
    GenreModule,
    DirectorModule,
    AuthorizationModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
