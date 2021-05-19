import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsIn, IsNotEmpty, IsString, ValidateNested } from 'class-validator';

const authorPlatforms = ['discord', 'github'];
export class StandupAuthor {
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

export class StandupDTO {
  @ApiProperty({ required: true, type: StandupAuthor })
  @ValidateNested()
  @IsNotEmpty()
  @Type(() => StandupAuthor)
  author: StandupAuthor;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  yesterdayMessage: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  todayMessage: string;
}
