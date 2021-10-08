import { AstraModule } from '@cahllagerfeld/nestjs-astra';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { AstraApiModule } from '../astra/astra-api.module';
import { AstraConfigService } from '../astra/astra-config.service';
import { AstraService } from '../astra/astra.service';
import { AuthModule } from '../auth/auth.module';
import { CommunitystatsMappingService } from './communitystats-mapping.service';
import { GeocodingService } from './geocoding.service';
import { GithubController } from './github.controller';
import { GithubService } from './github.service';

describe('GithubController', () => {
  let controller: GithubController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        AstraApiModule,
        HttpModule,
        AuthModule,
        AstraModule.forRootAsync({
          useClass: AstraConfigService,
        }),
        AstraModule.forFeature({
          namespace: 'eddiehub',
          collection: 'github',
        }),
        ConfigModule.forRoot({
          isGlobal: true,
        }),
      ],
      controllers: [GithubController],
      providers: [
        GithubService,
        CommunitystatsMappingService,
        GeocodingService,
        AstraService,
      ],
    }).compile();

    controller = module.get<GithubController>(GithubController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
