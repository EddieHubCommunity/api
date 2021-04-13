import { ApiProperty } from '@nestjs/swagger';

export class SearchStandupDTO {
  @ApiProperty({ required: true })
  discordUser: string;
}
