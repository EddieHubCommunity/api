import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

const authorPlatforms = ['discord', 'github'];

export class DiscordProfileAuthor {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: true, enum: authorPlatforms })
  @IsIn(authorPlatforms)
  platform: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  uid: string;
}

export class SocialsDTO {
  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  discord?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  twitter?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  linkedin?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  github?: string;
}

export class DiscordDTO {
  @ApiProperty({ required: true, type: DiscordProfileAuthor })
  @ValidateNested()
  @IsNotEmpty()
  @Type(() => DiscordProfileAuthor)
  author: DiscordProfileAuthor;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  bio?: string;

  @ApiProperty({ type: SocialsDTO, required: false })
  @Type(() => SocialsDTO)
  @ValidateNested()
  @IsOptional()
  socials?: SocialsDTO;
}
