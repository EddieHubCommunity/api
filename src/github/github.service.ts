import { Injectable } from '@nestjs/common';
import { CommunitystatsMappingService } from './communitystats-mapping.service';

@Injectable()
export class GithubService {
  constructor(private readonly mappingService: CommunitystatsMappingService) {}
}
