export interface GithubLocation {
  provided?: string;
  lat?: number;
  long?: number;
}

export interface GithubProfileResponse {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
  name?: any;
  company?: any;
  blog: string;
  location: string;
  email?: any;
  hireable?: any;
  bio: string;
  twitter_username: string;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: Date;
  updated_at: Date;
}

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
