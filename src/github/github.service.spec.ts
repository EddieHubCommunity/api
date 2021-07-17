import { AstraModule } from '@cahllagerfeld/nestjs-astra';
import { HttpModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { AstraConfigService } from '../astra/astra-config.service';
import { AuthModule } from '../auth/auth.module';
import { CommunitystatsMappingService } from './communitystats-mapping.service';
import { GeocodingService } from './geocoding.service';
import { GithubService } from './github.service';

describe('GithubService', () => {
  let service: GithubService;

  beforeEach(async () => {
    process.env.SECRET = 'Test';
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        AuthModule,
        HttpModule,
        ConfigModule.forRoot({
          isGlobal: true,
        }),
        AstraModule.forRootAsync({
          useClass: AstraConfigService,
        }),
        AstraModule.forFeature({
          namespace: 'eddiehub',
          collection: 'github',
        }),
      ],
      providers: [
        GithubService,
        CommunitystatsMappingService,
        GeocodingService,
      ],
    }).compile();

    service = module.get<GithubService>(GithubService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
