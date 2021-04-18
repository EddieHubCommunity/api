import { Module } from '@nestjs/common';
import { GithubController } from './github.controller';
import { GithubService } from './github.service';
import { CommunitystatsMappingService } from './communitystats-mapping.service';

@Module({
  controllers: [GithubController],
  providers: [GithubService, CommunitystatsMappingService],
})
export class GithubModule {}
