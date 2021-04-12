import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateDiscordDto } from './create-discord.dto';

export class ReadDiscordDto extends PartialType(CreateDiscordDto) {
  @ApiProperty()
  id: number;
}
