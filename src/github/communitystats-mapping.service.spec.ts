import { Test, TestingModule } from '@nestjs/testing';
import { CommunitystatsMappingService } from './communitystats-mapping.service';

describe('CommunitystatsmappingService', () => {
  let service: CommunitystatsMappingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommunitystatsMappingService],
    }).compile();

    service = module.get<CommunitystatsMappingService>(
      CommunitystatsMappingService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
