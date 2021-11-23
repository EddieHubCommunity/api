import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';

export class SocialItemDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  url: string;
}

export class SocialsDTO {
  @ApiProperty({ type:  SocialItemDTO })
  @ValidateNested()
  @Type(() => SocialItemDTO)
  github: SocialItemDTO;

  @ApiProperty({ type:  SocialItemDTO })
  @ValidateNested()
  @Type(() => SocialItemDTO)
  twitter: SocialItemDTO;

  @ApiProperty({ type: SocialItemDTO })
  @ValidateNested()
  @Type(() => SocialItemDTO)
  youtube: SocialItemDTO;

  @ApiProperty({ type:  SocialItemDTO })
  @ValidateNested()
  @Type(() => SocialItemDTO)
  Paypal: SocialItemDTO;

  @ApiProperty({ type:  SocialItemDTO })
  @ValidateNested()
  @Type(() => SocialItemDTO)
  blog: SocialItemDTO;
}

export class MilestoneDTO {
  @ApiProperty()
  title: string;

  @ApiProperty()
  date: string;

  @ApiProperty()
  icon: string;

  @ApiProperty()
  color: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  url: string;
}

export class ProfileDTO {
  @ApiProperty()
  bio: string;

  @ApiProperty()
  githubUsername: string;

  @ApiProperty()
  avatarURL: string;

  @ApiProperty({ type: SocialsDTO })
  @ValidateNested()
  @IsNotEmpty()
  @Type(() => SocialsDTO)
  profiles: SocialsDTO;

  @ApiProperty()
  milestones: MilestoneDTO[];
}
