import { ApiProperty } from '@nestjs/swagger';

export class StandupDTO {
  @ApiProperty()
  discordUser: string;
  @ApiProperty()
  yesterdayMessage: string;
  @ApiProperty()
  todayMessage: string;
}
