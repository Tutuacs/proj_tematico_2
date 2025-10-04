import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { BodyPartService } from './body-part.service';
import { BodyPartController } from './body-part.controller';
import { BodyPartFunctionsService } from './body-part-functions/body-part-functions.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [BodyPartController],
  providers: [BodyPartService, BodyPartFunctionsService],
})
export class BodyPartModule {}
