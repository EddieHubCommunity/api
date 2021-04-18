import { ApiProperty } from '@nestjs/swagger';
import {
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

const events = [
  'workflow_dispatch',
  'repository_dispatch',
  'check_run',
  'check_suite',
  'create',
  'delete',
  'deployment',
  'deployment_status',
  'fork',
  'gollum',
  'issue_comment',
  'issues',
  'label',
  'milestone',
  'page_build',
  'project',
  'project_card',
  'project_column',
  'public',
  'pull_request',
  'pull_request_review',
  'pull_request_review_comment',
  'pull_request_target',
  'push',
  'registry_package',
  'release',
  'status',
  'watch',
  'workflow_run',
];

export class GithubDTO {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  bio: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  avatarUrl: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  followers: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  repos: number;
  // ... any other useful info public info https://docs.github.com/en/rest/reference/users
  @ApiProperty({ enum: events, required: false })
  @IsString()
  @IsOptional()
  @IsIn(events)
  event: string;
}
