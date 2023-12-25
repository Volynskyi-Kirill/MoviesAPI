import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { GenreService } from './genre.service';
import { MovieService } from '../movie/movie.service';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { Roles } from '../decorators/roles.decorator';
import { Role } from '../utils/enum/roles.enum';
import { Public } from '../decorators/public.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { InjectConnection } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@ApiBearerAuth()
@ApiTags('genre')
@Controller('genre')
export class GenreController {
  constructor(
    private readonly genreService: GenreService,
    private readonly movieService: MovieService,
    @InjectConnection() private connection: mongoose.Connection,
  ) {}

  @Roles(Role.Admin)
  @Post()
  create(@Body() createGenreDto: CreateGenreDto) {
    return this.genreService.create(createGenreDto);
  }

  @Public()
  @Get()
  findAll() {
    return this.genreService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.genreService.findOne(id);
  }

  @Roles(Role.Admin)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGenreDto: UpdateGenreDto) {
    return this.genreService.update(id, updateGenreDto);
  }

  @Roles(Role.Admin)
  @Delete(':id')
  async deleteById(@Param('id') id: string) {
    const session = await this.connection.startSession();
    session.startTransaction();

    try {
      await this.movieService.deleteGenreFromMovies(id, session);
      await this.genreService.deleteById(id, session);
      await session.commitTransaction();
    } catch (error) {
      await session.abortTransaction();
      throw error;
    }
  }
}
