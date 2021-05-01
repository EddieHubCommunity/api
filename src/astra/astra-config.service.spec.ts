import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { AstraConfigService } from './astra-config.service';

describe('AstraConfigService', () => {
  let service: AstraConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot({ isGlobal: true })],
      providers: [AstraConfigService],
    }).compile();

    service = module.get<AstraConfigService>(AstraConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
