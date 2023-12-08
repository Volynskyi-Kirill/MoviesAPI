import { ApiProperty } from '@nestjs/swagger';

export class CreateAuthorizationDto {
  @ApiProperty()
  email: string;
  @ApiProperty()
  password: string;
}
