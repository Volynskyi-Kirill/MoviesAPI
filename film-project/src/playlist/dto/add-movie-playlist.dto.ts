import { ApiProperty } from '@nestjs/swagger';

export class AddMoviePlaylistDto {
  @ApiProperty()
  movies: string;
}
