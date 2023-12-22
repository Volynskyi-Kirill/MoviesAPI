import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ReportService } from './report.service';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import * as schedule from 'node-schedule';

@Controller('report')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  job = schedule.scheduleJob('*/10 * * * *', async () => {
    const createReportDto = await this.reportService.makeReport();
    this.reportService.create(createReportDto);
  });

  @Post()
  create(@Body() createReportDto: CreateReportDto) {
    return this.reportService.create(createReportDto);
  }

  @Get()
  findAll() {
    return this.reportService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reportService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReportDto: UpdateReportDto) {
    return this.reportService.update(id, updateReportDto);
  }

  @Delete(':id')
  deleteById(@Param('id') id: string) {
    return this.reportService.deleteById(id);
  }
}
