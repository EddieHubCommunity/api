import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { CommunitystatsMappingService } from './communitystats-mapping.service';
import { GeocodingService } from './geocoding.service';
import { GithubController } from './github.controller';
import { GithubService } from './github.service';

@Module({
  imports: [HttpModule, AuthModule],
  controllers: [GithubController],
  providers: [
    GithubService,
    CommunitystatsMappingService,
    GeocodingService,
  ],
})
export class GithubModule {}
