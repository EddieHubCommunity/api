import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNotEmpty, IsString } from 'class-validator';

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

export class DiscordDTO {}
