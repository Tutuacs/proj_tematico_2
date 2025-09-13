import { Test, TestingModule } from '@nestjs/testing';
import { BodyPartFunctionsService } from './body-part-functions.service';

describe('BodyPartFunctionsService', () => {
  let service: BodyPartFunctionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BodyPartFunctionsService],
    }).compile();

    service = module.get<BodyPartFunctionsService>(BodyPartFunctionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
