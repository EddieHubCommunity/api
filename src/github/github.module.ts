import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TokenStrategy } from '../auth/token.strategy';
import { CommunitystatsMappingService } from './communitystats-mapping.service';
import { GeocodingService } from './geocoding.service';
import { GithubController } from './github.controller';
import { GithubService } from './github.service';

@Module({
  imports: [HttpModule],
  controllers: [GithubController],
  providers: [
    GithubService,
    CommunitystatsMappingService,
    GeocodingService,
    TokenStrategy,
  ],
})
export class GithubModule {}
