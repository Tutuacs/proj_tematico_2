import { Test, TestingModule } from '@nestjs/testing';
import { PlanFunctionsService } from './plan-functions.service';

describe('PlanFunctionsService', () => {
  let service: PlanFunctionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlanFunctionsService],
    }).compile();

    service = module.get<PlanFunctionsService>(PlanFunctionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
