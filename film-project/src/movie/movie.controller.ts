import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Headers,
  Req,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import { AuthorizationService } from '../authorization/authorization.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Roles } from '../decorators/roles.decorator';
import { Role } from '../utils/enum/roles.enum';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { HEADERS } from '../utils/constants';
import { Public } from '../decorators/public.decorator';
import { CACHE_KEY } from './movie.constants';
import { movieCache, clearCache } from './movie.cache';
import { UserDocument } from '../user/schemas/user.schema';
import { Permissions } from '../utils/enum/permissions.enum';

@ApiBearerAuth()
@ApiTags('movie')
@Controller('movie')
export class MovieController {
  constructor(
    private readonly movieService: MovieService,
    private readonly authorizationService: AuthorizationService,
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

  @Delete(':id')
  deleteById(
    @Param('id') id: string,
    @Req() req: Request & { user: UserDocument },
  ) {
    const { user } = req;
    this.authorizationService.can(user, Permissions.MANAGE_REVIEWS);
    clearCache();
    return this.movieService.deleteById(id);
  }
}
