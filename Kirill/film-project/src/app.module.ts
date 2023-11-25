// import { config } from 'dotenv';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MovieModule } from './movie/movie.module';

// config();

@Module({
  imports: [
    MovieModule,
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/movies'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
