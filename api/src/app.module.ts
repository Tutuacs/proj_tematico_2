import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ProfileModule } from './profile/profile.module';
import { ReportModule } from './report/report.module';
import { BodyPartModule } from './body-part/body-part.module';
import { PlanModule } from './plan/plan.module';
import { ActivityModule } from './activity/activity.module';
import { TrainModule } from './train/train.module';
import { ExerciseModule } from './exercise/exercise.module';

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
    ExerciseModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
