import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class StandupDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  discordUser: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  yesterdayMessage: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  todayMessage: string;
}
