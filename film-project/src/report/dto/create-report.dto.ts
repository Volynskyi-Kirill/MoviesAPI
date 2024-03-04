import { ApiProperty } from '@nestjs/swagger';

export class CreateReportDto {
  @ApiProperty()
  films: number;

  @ApiProperty()
  playlists: number;

  @ApiProperty()
  users: number;
}
