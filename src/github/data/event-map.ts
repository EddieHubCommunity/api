import { HttpException, HttpStatus } from '@nestjs/common';

export const eventMap = {
  workflow_dispatch: 'workflowDispatch',
  repository_dispatch: 'repositoryDispatch',
  check_run: 'checkRun',
  check_suite: 'checkSuite',
  create: 'create',
  delete: 'delete',
  deployment: 'deployment',
  deployment_status: 'deploymentStatus',
  fork: 'fork',
  gollum: 'gollum',
  issue_comment: 'issueComment',
  issues: 'issues',
  label: 'label',
  milestone: 'milestone',
  page_build: 'pageBuild',
  project: 'project',
  project_card: 'projectCard',
  project_column: 'projectColumn',
  public: 'public',
  pull_request: 'pullRequest',
  pull_request_review: 'pullRequestReview',
  pull_request_review_comment: 'pullRequestReviewComment',
  pull_request_target: 'pullRequestTarget',
  push: 'push',
  registry_package: 'registryPackage',
  release: 'release',
  status: 'status',
  watch: 'watch',
  workflow_run: 'workflowRun',
};

export function mapEvent(githubEvent: string): string {
  let mappedValue: string;
  try {
    mappedValue = eventMap[githubEvent];
  } catch {
    throw new HttpException(
      'Please Provide valid Githubevent',
      HttpStatus.BAD_REQUEST,
    );
  }
  return mappedValue;
}
