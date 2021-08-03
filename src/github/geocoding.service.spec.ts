import { HttpModule } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { GeocodingService } from './geocoding.service';

describe('GeocodingService', () => {
  let service: GeocodingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [GeocodingService],
    }).compile();

    service = module.get<GeocodingService>(GeocodingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
