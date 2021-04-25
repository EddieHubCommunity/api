import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDate,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

const platforms = ['YouTube', 'Twitch'];
const authorPlatforms = ['discord', 'github'];

export class CalendarEventAuthorDTO {
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

export class CalendarEventDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ required: true })
  name: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  description: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  url: string;

  @ApiProperty({ required: true, enum: platforms })
  @IsNotEmpty()
  @IsString()
  @IsIn(platforms)
  platform: string;

  @ApiProperty({ required: true, type: CalendarEventAuthorDTO })
  @ValidateNested()
  @IsNotEmpty()
  @Type(() => CalendarEventAuthorDTO)
  author: CalendarEventAuthorDTO;

  @ApiProperty({ required: true })
  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  startDate: Date;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  endDate: Date;
}
