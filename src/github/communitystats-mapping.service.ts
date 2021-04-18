import { Injectable, BadRequestException } from '@nestjs/common';
import { CommunityStats } from './interfaces/github.interface';

@Injectable()
export class CommunitystatsMappingService {
  private eventMap = {
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
    project_column: 'projectCollumn',
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

  private mapEvent(githubEvent: string): string {
    let mappedValue: string;
    try {
      mappedValue = this.eventMap[githubEvent];
    } catch {
      throw new BadRequestException('Please Provide valid Githubevent');
    }
    return mappedValue;
  }

  public mapCommunityState(
    event: string,
    existingStats: CommunityStats,
  ): CommunityStats {
    const stats = { ...existingStats };
    const mappedValue = this.mapEvent(event);
    if (mappedValue in stats) {
      stats[mappedValue] += 1;
      return stats;
    }
    stats[mappedValue] = 1;
    return stats;
  }
}
