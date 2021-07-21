import { HttpModule, Module } from '@nestjs/common';
import { AstraService } from '../astra/astra.service';
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
    AstraService,
  ],
})
export class GithubModule {}
