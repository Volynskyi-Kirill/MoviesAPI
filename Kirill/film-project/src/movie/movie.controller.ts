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
import { AuthorizationService } from '../authorization/authorization.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { ERROR_MESSAGE, DELIMITER } from '../constants';

@Controller('movie')
export class MovieController {
  constructor(
    private readonly movieService: MovieService,
    private readonly authorizationService: AuthorizationService,
  ) {}

  @Post()
  create(@Body() createMovieDto: CreateMovieDto) {
    return this.movieService.create(createMovieDto);
  }

  @Get()
  async findAll(@Headers('authorization') authorizationHeader: string) {
    const [email, password] = authorizationHeader.split(DELIMITER);

    const user = await this.authorizationService.findUserByToken(
      email,
      password,
    );

    if (!user.length) throw new Error(ERROR_MESSAGE.CHECK_TOKEN);

    return this.movieService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.movieService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMovieDto: UpdateMovieDto) {
    return this.movieService.update(id, updateMovieDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.movieService.remove(id);
  }
}
