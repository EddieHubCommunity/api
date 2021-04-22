import { HttpModule, Module } from '@nestjs/common';
import { GithubController } from './github.controller';
import { GithubService } from './github.service';
import { CommunitystatsMappingService } from './communitystats-mapping.service';
import { GeocodingService } from './geocoding.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [HttpModule, AuthModule],
  controllers: [GithubController],
  providers: [GithubService, CommunitystatsMappingService, GeocodingService],
})
export class GithubModule {}
