import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PlaylistService } from './playlist.service';
import { UserService } from '../user/user.service';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { AddMoviePlaylistDto } from './dto/add-movie-playlist.dto';
import { DeleteMoviePlaylistDto } from './dto/delete-movie-playlist.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('playlist')
@Controller('playlist')
export class PlaylistController {
  constructor(
    private readonly playlistService: PlaylistService,
    private readonly userService: UserService,
  ) {}

  @Post()
  async create(@Body() createPlaylistDto: CreatePlaylistDto) {
    const userId = createPlaylistDto.created;

    const playlist = await this.playlistService.create(createPlaylistDto);

    const playlistId = playlist._id;
    await this.userService.addPlaylist(userId, String(playlistId));

    return playlist;
  }

  @Get()
  findAll() {
    return this.playlistService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.playlistService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePlaylistDto: UpdatePlaylistDto,
  ) {
    return this.playlistService.update(id, updatePlaylistDto);
  }

  @Post(':id/movies')
  addMovie(
    @Param('id') id: string,
    @Body() addMoviePlaylistDto: AddMoviePlaylistDto,
  ) {
    return this.playlistService.addMovie(id, addMoviePlaylistDto);
  }

  @Delete(':id/movies')
  deleteMovie(
    @Param('id') id: string,
    @Body() deleteMoviePlaylistDto: DeleteMoviePlaylistDto,
  ) {
    return this.playlistService.deleteMovie(id, deleteMoviePlaylistDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const user = await this.playlistService.findOne(id);
    await this.userService.deletePlaylist(String(user?.created), id);
    return await this.playlistService.remove(id);
  }
}
