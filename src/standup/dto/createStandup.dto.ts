import { ApiProperty } from '@nestjs/swagger';

export class CreateStandupDTO {
  @ApiProperty()
  discordUser: string;
  @ApiProperty()
  yesterdayMessage: string;
  @ApiProperty()
  todayMessage: string;
}
