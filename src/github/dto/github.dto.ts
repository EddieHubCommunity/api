import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

class CommunityStats {
  //TODO Validation for CommunityStats
  [key: string]: number;
}

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
  @ApiProperty({ type: CommunityStats, required: false })
  @IsOptional()
  @ValidateNested()
  @Type(() => CommunityStats)
  communityStats: CommunityStats;
}
