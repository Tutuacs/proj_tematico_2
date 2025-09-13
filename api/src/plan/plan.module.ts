import { Module } from '@nestjs/common';
import { PlanService } from './plan.service';
import { PlanController } from './plan.controller';
import { PlanFunctionsService } from './plan-functions/plan-functions.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [PlanController],
  providers: [PlanService, PlanFunctionsService],
})
export class PlanModule {}
