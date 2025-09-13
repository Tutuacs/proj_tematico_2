import { Test, TestingModule } from '@nestjs/testing';
import { ActivityFunctionsService } from './activity-functions.service';

describe('ActivityFunctionsService', () => {
  let service: ActivityFunctionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ActivityFunctionsService],
    }).compile();

    service = module.get<ActivityFunctionsService>(ActivityFunctionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
