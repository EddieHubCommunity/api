import { PartialType } from '@nestjs/mapped-types';
import { CreateDiscordDto } from './create-discord.dto';

export class ReadDiscordDto extends PartialType(CreateDiscordDto) {
  id: number;
}
