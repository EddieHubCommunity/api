import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateDiscordDto } from './create-discord.dto';

export class UpdateDiscordDto extends PartialType(CreateDiscordDto) {
  @ApiProperty()
  id: number;
}
