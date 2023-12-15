import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  ForbiddenException,
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
import { VISIBILITY_OPTIONS, ERROR_MESSAGE } from '../utils/constants';

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

    return this.userService.findPlaylists(userId);
  }

  @Post('my')
  async addPlaylistToUser(
    @Req() req: Request & { user: UserDocument },
    @Body() payload: { playlistId: string },
  ) {
    const { user } = req;
    const userId = String(user?._id);

    const { playlistId } = payload;
    const playlist = await this.playlistService.findOne(playlistId);

    if (playlist?.visibility === VISIBILITY_OPTIONS.PRIVATE) {
      throw new ForbiddenException(ERROR_MESSAGE.ACCESS_DENIED);
    }

    this.userService.addPlaylist(userId, playlistId);
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @Req() req: Request & { user: UserDocument },
  ) {
    const { user } = req;

    const userId = user._id.toString();
    const playlist = await this.playlistService.findById(id);
    const playlistOwnerId = playlist?.createdBy.toString();

    const isUserOwner = playlistOwnerId === userId;
    const isPrivate = playlist?.visibility === VISIBILITY_OPTIONS.PRIVATE;
    const isAccessDenied = isPrivate && !isUserOwner;

    if (isAccessDenied) {
      throw new ForbiddenException(ERROR_MESSAGE.ACCESS_DENIED);
    }

    return playlist;
  }

  @Owner()
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePlaylistDto: UpdatePlaylistDto,
  ) {
    return this.playlistService.update(id, updatePlaylistDto);
  }

  @Owner()
  @Post(':id/movies')
  async addMovie(
    @Param('id') id: string,
    @Body() addMoviePlaylistDto: AddMoviePlaylistDto,
  ) {
    return this.playlistService.addMovie(id, addMoviePlaylistDto);
  }

  @Owner()
  @Delete(':id/movies')
  async deleteMovie(
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
