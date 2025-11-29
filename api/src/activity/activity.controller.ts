import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ActivityService } from './activity.service';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { AuthGuard, RoleGuard } from 'src/guards';
import { Access, ROLE } from 'src/decorators';
import { ProfileAuth } from 'src/decorators/ProfileAtuh.decorator';

@UseGuards(AuthGuard, RoleGuard)
@Controller('activity')
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {}

  @Access(ROLE.TRAINEE, ROLE.TRAINER, ROLE.ADMIN)
  @Post()
  create(
    @Body() createActivityDto: CreateActivityDto,
    @ProfileAuth()
    profile: {
      id: string;
      email: string;
      role: number;
      name: string;
    },
  ) {
    return this.activityService.create(createActivityDto, profile);
  }

  @Access(ROLE.TRAINEE, ROLE.TRAINER, ROLE.ADMIN)
  @Get()
  findAll(
    @Query('planId') planId: string,
    @ProfileAuth()
    profile: {
      id: string;
      email: string;
      role: number;
      name: string;
    },
  ) {
    return this.activityService.findAll(profile, planId);
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
    return this.activityService.findOne(id, profile);
  }

  @Access(ROLE.TRAINEE, ROLE.TRAINER, ROLE.ADMIN)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateActivityDto: UpdateActivityDto,
    @ProfileAuth()
    profile: {
      id: string;
      email: string;
      role: number;
      name: string;
    },
  ) {
    return this.activityService.update(id, updateActivityDto, profile);
  }

  @Access(ROLE.TRAINEE, ROLE.TRAINER, ROLE.ADMIN)
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
    return this.activityService.remove(id, profile);
  }
}
