import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ProfileModule } from './profile/profile.module';
import { ReportModule } from './report/report.module';
import { BodyPartModule } from './body-part/body-part.module';
import { PlanModule } from './plan/plan.module';
import { ActivityModule } from './activity/activity.module';
import { TrainModule } from './train/train.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    AuthModule,
    ProfileModule,
    ReportModule,
    BodyPartModule,
    PlanModule,
    ActivityModule,
    TrainModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
