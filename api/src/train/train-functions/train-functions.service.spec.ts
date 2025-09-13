import { Test, TestingModule } from '@nestjs/testing';
import { TrainFunctionsService } from './train-functions.service';

describe('TrainFunctionsService', () => {
  let service: TrainFunctionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TrainFunctionsService],
    }).compile();

    service = module.get<TrainFunctionsService>(TrainFunctionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
