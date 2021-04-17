import { Test, TestingModule } from '@nestjs/testing';
import { StandupService } from './standup.service';

describe('StandupService', () => {
  let service: StandupService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StandupService],
    }).compile();

    service = module.get<StandupService>(StandupService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
