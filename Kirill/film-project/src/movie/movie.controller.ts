import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Roles } from '../decorators/roles.decorator';
import { Role } from '../utils/roles.enum';

@Controller('movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Roles(Role.Admin)
  @Post()
  create(@Body() createMovieDto: CreateMovieDto) {
    return this.movieService.create(createMovieDto);
  }

  @Get()
  async findAll() {
    return this.movieService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.movieService.findOne(id);
  }

  @Roles(Role.Admin)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMovieDto: UpdateMovieDto) {
    return this.movieService.update(id, updateMovieDto);
  }

  @Roles(Role.Admin)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.movieService.remove(id);
  }
}
