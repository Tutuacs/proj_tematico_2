import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ActivityService } from './activity.service';
import { ActivityController } from './activity.controller';
import { ActivityFunctionsService } from './activity-functions/activity-functions.service';

@Module({
  imports: [PrismaModule],
  controllers: [ActivityController],
  providers: [ActivityService, ActivityFunctionsService],
})
export class ActivityModule {}
