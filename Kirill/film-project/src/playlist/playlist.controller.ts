import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { PlaylistService } from './playlist.service';
import { UserService } from '../user/user.service';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { AddMoviePlaylistDto } from './dto/add-movie-playlist.dto';
import { DeleteMoviePlaylistDto } from './dto/delete-movie-playlist.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserDocument } from '../user/schemas/user.schema';
import { Request } from 'express';
import { Public } from '../decorators/public.decorator';
import { Owner } from '../decorators/owner.decorator';

@ApiBearerAuth()
@ApiTags('playlist')
@Controller('playlist')
export class PlaylistController {
  constructor(
    private readonly playlistService: PlaylistService,
    private readonly userService: UserService,
  ) {}

  @Post()
  async create(
    @Req() req: Request & { user: UserDocument },
    @Body() createPlaylistDto: CreatePlaylistDto,
  ) {
    const { user } = req;
    const userId = String(user?._id);
    createPlaylistDto.createdBy = userId;

    const playlist = await this.playlistService.create(createPlaylistDto);

    const playlistId = String(playlist._id);
    await this.userService.addPlaylist(userId, playlistId);

    return playlist;
  }

  @Public()
  @Get()
  findPublic() {
    return this.playlistService.findPublic();
  }

  @Get('my')
  findByUser(@Req() req: Request & { user: UserDocument }) {
    const { user } = req;
    const userId = String(user?._id);
    return this.playlistService.findByUser(userId);
  }

  @Owner()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.playlistService.findOne(id);
  }

  @Owner()
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePlaylistDto: UpdatePlaylistDto,
  ) {
    return this.playlistService.update(id, updatePlaylistDto);
  }

  @Owner()
  @Post(':id/movies')
  addMovie(
    @Param('id') id: string,
    @Body() addMoviePlaylistDto: AddMoviePlaylistDto,
  ) {
    return this.playlistService.addMovie(id, addMoviePlaylistDto);
  }

  @Owner()
  @Delete(':id/movies')
  deleteMovie(
    @Param('id') id: string,
    @Body() deleteMoviePlaylistDto: DeleteMoviePlaylistDto,
  ) {
    return this.playlistService.deleteMovie(id, deleteMoviePlaylistDto);
  }

  @Owner()
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const user = await this.playlistService.findOne(id);
    await this.userService.deletePlaylist(String(user?.createdBy), id);
    return await this.playlistService.remove(id);
  }
}
