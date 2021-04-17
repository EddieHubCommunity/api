interface communityStats {
  [key: string]: number;
}

export interface GithubProfile {
  id: number;
  username: string;
  bio?: string;
  avatarUrl?: string;
  followers?: number;
  repos?: number;
  communityStats?: communityStats;
  createdOn: Date;
  updatedOn: Date;
}
