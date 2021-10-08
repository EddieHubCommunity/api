import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { AstraApiModule } from '../astra/astra-api.module';
import { AstraService as AstraApiService } from '../astra/astra.service';
import { AuthModule } from '../auth/auth.module';
import { CommunitystatsMappingService } from './communitystats-mapping.service';
import { GeocodingService } from './geocoding.service';
import { GithubController } from './github.controller';
import { GithubService } from './github.service';

@Module({
  imports: [HttpModule, AuthModule, AstraApiModule],
  controllers: [GithubController],
  providers: [
    GithubService,
    CommunitystatsMappingService,
    GeocodingService,
    AstraApiService,
  ],
})
export class GithubModule {}
