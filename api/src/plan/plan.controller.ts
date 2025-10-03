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
import { PlanService } from './plan.service';
import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';
import { AuthGuard, RoleGuard } from 'src/guards';
import { Access, ROLE } from 'src/decorators';
import { ProfileAuth } from 'src/decorators/ProfileAtuh.decorator';

@UseGuards(AuthGuard, RoleGuard)
@Controller('plan')
export class PlanController {
  constructor(private readonly planService: PlanService) {}

  @Access(ROLE.TRAINER, ROLE.ADMIN)
  @Post()
  create(
    @Body() createPlanDto: CreatePlanDto,
    @ProfileAuth()
    profile: {
      id: string;
      email: string;
      role: number;
      name: string;
    },
  ) {
    return this.planService.create(createPlanDto, profile);
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
    return this.planService.findAll(profile);
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
    return this.planService.findOne(id, profile);
  }

  @Access(ROLE.TRAINER, ROLE.ADMIN)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePlanDto: UpdatePlanDto,
    @ProfileAuth()
    profile: {
      id: string;
      email: string;
      role: number;
      name: string;
    },
  ) {
    return this.planService.update(id, updatePlanDto, profile);
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
    return this.planService.remove(id, profile);
  }
}
