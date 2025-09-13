import { Test, TestingModule } from '@nestjs/testing';
import { ReportFunctionsService } from './report-functions.service';

describe('ReportFunctionsService', () => {
  let service: ReportFunctionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReportFunctionsService],
    }).compile();

    service = module.get<ReportFunctionsService>(ReportFunctionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
