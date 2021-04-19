import { Module } from '@nestjs/common';
import { GithubController } from './github.controller';
import { GithubService } from './github.service';
import { CommunitystatsMappingService } from './communitystats-mapping.service';
import { GeocodingService } from './geocoding.service';

@Module({
  controllers: [GithubController],
  providers: [GithubService, CommunitystatsMappingService, GeocodingService],
})
export class GithubModule {}
