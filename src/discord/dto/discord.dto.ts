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
  @ApiProperty({ required: true })
  name: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: true })
  url: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: true })
  platform: string;


}

export class DiscordDTO {
  @ApiProperty({ required: true, type: DiscordProfileAuthor })
  @ValidateNested()
  @IsNotEmpty()
  @Type(() => DiscordProfileAuthor)
  author: DiscordProfileAuthor;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  discordUID: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  bio?: string;

  @ApiProperty({ type: SocialsDTO, required: false, isArray: true })
  @Type(() => SocialsDTO)
  @ValidateNested()
  @IsOptional()
  socials?: SocialsDTO[];
}
