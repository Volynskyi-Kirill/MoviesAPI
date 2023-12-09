import { ApiProperty } from '@nestjs/swagger';

export class CreatePlaylistDto {
  @ApiProperty()
  title: string;
  @ApiProperty()
  movies: string[];
  @ApiProperty({ required: false })
  createdBy: string;
  @ApiProperty({ required: false })
  visibility?: string;
}
