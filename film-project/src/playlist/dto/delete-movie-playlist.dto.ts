import { PartialType } from '@nestjs/mapped-types';
import { AddMoviePlaylistDto } from './add-movie-playlist.dto';

export class DeleteMoviePlaylistDto extends PartialType(AddMoviePlaylistDto) {}
