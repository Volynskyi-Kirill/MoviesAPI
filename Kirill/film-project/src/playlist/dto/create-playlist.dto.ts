import { ApiProperty } from '@nestjs/swagger';

export class CreatePlaylistDto {
  @ApiProperty()
  title: string;
  @ApiProperty()
  movies: string[];
  @ApiProperty()
  created: string;
  @ApiProperty()
  visibility: string;
}
