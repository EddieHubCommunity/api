import { HttpModule, Module } from '@nestjs/common';
import { GithubController } from './github.controller';
import { GithubService } from './github.service';
import { CommunitystatsMappingService } from './communitystats-mapping.service';
import { GeocodingService } from './geocoding.service';
import { AuthModule } from '../auth/auth.module';
import { AstraModule } from '@cahllagerfeld/nestjs-astra';

@Module({
  imports: [
    HttpModule,
    AuthModule,
    AstraModule.forFeature({ namespace: 'eddiehub', collection: 'github' }),
  ],
  controllers: [GithubController],
  providers: [GithubService, CommunitystatsMappingService, GeocodingService],
})
export class GithubModule {}
