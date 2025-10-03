import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ReportService } from './report.service';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { AuthGuard, RoleGuard } from 'src/guards';
import { Access, ROLE } from 'src/decorators';
import { ProfileAuth } from 'src/decorators/ProfileAtuh.decorator';

@UseGuards(AuthGuard, RoleGuard)
@Controller('report')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Access(ROLE.TRAINER, ROLE.ADMIN)
  @Post()
  create(
    @Body() createReportDto: CreateReportDto,
    @ProfileAuth()
    profile: {
      id: string;
      email: string;
      role: number;
      name: string;
    },
  ) {
    return this.reportService.create(createReportDto, profile);
  }

  @Access(ROLE.TRAINEE, ROLE.TRAINER, ROLE.ADMIN)
  @Get()
  findAll(
    @ProfileAuth()
    profile: {
      id: string;
      email: string;
      role: number;
      name: string;
    },
  ) {
    return this.reportService.findAll(profile);
  }

  @Access(ROLE.TRAINEE, ROLE.TRAINER, ROLE.ADMIN)
  @Get(':id')
  findOne(
    @Param('id') id: string,
    @ProfileAuth()
    profile: {
      id: string;
      email: string;
      role: number;
      name: string;
    },
  ) {
    return this.reportService.findOne(id, profile);
  }

  @Access(ROLE.TRAINER, ROLE.ADMIN)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateReportDto: UpdateReportDto,
    @ProfileAuth()
    profile: {
      id: string;
      email: string;
      role: number;
      name: string;
    },
  ) {
    return this.reportService.update(id, updateReportDto, profile);
  }

  @Access(ROLE.TRAINER, ROLE.ADMIN)
  @Delete(':id')
  remove(
    @Param('id') id: string,
    @ProfileAuth()
    profile: {
      id: string;
      email: string;
      role: number;
      name: string;
    },
  ) {
    return this.reportService.remove(id, profile);
  }
}
