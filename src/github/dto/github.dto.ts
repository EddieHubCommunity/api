import { ApiProperty } from '@nestjs/swagger';

class CommunityStats {
  [key: string]: number;
}

export class GithubDTO {
  @ApiProperty()
  username: string;
  @ApiProperty()
  bio: string;
  @ApiProperty()
  avatarUrl: string;
  @ApiProperty()
  followers: number;
  @ApiProperty()
  repos: number;
  // ... any other useful info public info https://docs.github.com/en/rest/reference/users
  @ApiProperty({ type: CommunityStats })
  communityStats: CommunityStats;
}
