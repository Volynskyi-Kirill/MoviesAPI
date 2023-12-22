import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Headers,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Roles } from '../decorators/roles.decorator';
import { Role } from '../utils/enum';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { HEADERS } from '../utils/constants';
import { Public } from '../decorators/public.decorator';
import { CACHE_KEY } from './movie.constants';
import { movieCache, clearCache } from './movie.cache';
import { InjectConnection } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@ApiBearerAuth()
@ApiTags('movie')
@Controller('movie')
export class MovieController {
  constructor(
    private readonly movieService: MovieService,
    @InjectConnection() private connection: mongoose.Connection,
  ) {}

  @Roles(Role.Admin)
  @Post()
  create(@Body() createMovieDto: CreateMovieDto) {
    clearCache();
    return this.movieService.create(createMovieDto);
  }

  @Public()
  @Get()
  async findAll(@Headers(HEADERS.AUTHORIZATION) authorization: string) {
    if (!authorization) {
      let moviesTitle = movieCache.get(CACHE_KEY.MOVIES_TITLE);

      if (moviesTitle) return moviesTitle;

      moviesTitle = this.movieService.findMoviesTitle();
      movieCache.set(CACHE_KEY.MOVIES_TITLE, moviesTitle);

      return moviesTitle;
    }
    let movies = movieCache.get(CACHE_KEY.MOVIES);

    if (movies) return movies;

    movies = this.movieService.findAll();
    movieCache.set(CACHE_KEY.MOVIES, movies);

    return movies;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.movieService.findOne(id);
  }

  @Roles(Role.Admin)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMovieDto: UpdateMovieDto) {
    clearCache();
    return this.movieService.update(id, updateMovieDto);
  }

  @Roles(Role.Admin)
  @Delete(':id')
  deleteById(@Param('id') id: string) {
    clearCache();
    return this.movieService.deleteById(id);
  }
}
