import { Test, TestingModule } from '@nestjs/testing';
import { BodyPartController } from './body-part.controller';
import { BodyPartService } from './body-part.service';

describe('BodyPartController', () => {
  let controller: BodyPartController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BodyPartController],
      providers: [BodyPartService],
    }).compile();

    controller = module.get<BodyPartController>(BodyPartController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
