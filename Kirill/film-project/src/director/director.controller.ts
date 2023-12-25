import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DirectorService } from './director.service';
import { CreateDirectorDto } from './dto/create-director.dto';
import { UpdateDirectorDto } from './dto/update-director.dto';
import { Roles } from '../decorators/roles.decorator';
import { Role } from '../utils/enum/roles.enum';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('director')
@Controller('director')
export class DirectorController {
  constructor(private readonly directorService: DirectorService) {}

  @Roles(Role.Admin)
  @Post()
  create(@Body() createDirectorDto: CreateDirectorDto) {
    return this.directorService.create(createDirectorDto);
  }

  @Get()
  findAll() {
    return this.directorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.directorService.findOne(id);
  }

  @Roles(Role.Admin)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDirectorDto: UpdateDirectorDto,
  ) {
    return this.directorService.update(id, updateDirectorDto);
  }

  @Roles(Role.Admin)
  @Delete(':id')
  deleteById(@Param('id') id: string) {
    return this.directorService.deleteById(id);
  }
}
