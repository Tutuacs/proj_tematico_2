import { Module } from '@nestjs/common';
import { TrainService } from './train.service';
import { TrainController } from './train.controller';
import { TrainFunctionsService } from './train-functions/train-functions.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [TrainController],
  providers: [TrainService, TrainFunctionsService],
})
export class TrainModule {}
