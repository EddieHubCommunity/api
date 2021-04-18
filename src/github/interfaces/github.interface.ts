export interface CommunityStats {
  workflowDispatch?: number;
  repositoryDispatch?: number;
  checkRun?: number;
  checkSuite?: number;
  create?: number;
  delete?: number;
  deployment?: number;
  deploymentStatus?: number;
  fork?: number;
  gollum?: number;
  issueComment?: number;
  issues?: number;
  label?: number;
  milestone?: number;
  pageBuild?: number;
  project?: number;
  projectCard?: number;
  projectColumn?: number;
  public?: number;
  pullRequest?: number;
  pullRequestReview?: number;
  pullRequestReviewComment?: number;
  pullRequestTarget?: number;
  push?: number;
  registryPackage?: number;
  release?: number;
  status?: number;
  watch?: number;
  workflowRun?: number;
}

export interface GithubLocation {
  provided?: string;
  lat?: number;
  long?: number;
}

export interface GithubProfile {
  id: number;
  username: string;
  bio?: string;
  avatarUrl?: string;
  followers?: number;
  repos?: number;
  location?: GithubLocation;
  organization?: string;
  blog?: string;
  communityStats?: CommunityStats;
  createdOn: Date;
  updatedOn: Date;
}
