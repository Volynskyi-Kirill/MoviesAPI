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

@ApiBearerAuth()
@ApiTags('movie')
@Controller('movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Roles(Role.Admin)
  @Post()
  create(@Body() createMovieDto: CreateMovieDto) {
    return this.movieService.create(createMovieDto);
  }

  @Public()
  @Get()
  async findAll(@Headers(HEADERS.AUTHORIZATION) authorization: string) {
    if (!authorization) {
      return this.movieService.findMoviesTitle();
    }
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
