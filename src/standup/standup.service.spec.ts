import { AstraModule } from '@cahllagerfeld/nestjs-astra';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { AstraConfigService } from '../astra/astra-config.service';
import { CommonsModule } from '../commons/commons.module';
import { StandupService } from './standup.service';

describe('StandupService', () => {
  let service: StandupService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        CommonsModule,
        ConfigModule.forRoot({
          isGlobal: true,
        }),
        AstraModule.forRootAsync({
          useClass: AstraConfigService,
        }),
        AstraModule.forFeature({
          namespace: 'eddiehub',
          collection: 'standup',
        }),
      ],
      providers: [StandupService],
    }).compile();

    service = module.get<StandupService>(StandupService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
