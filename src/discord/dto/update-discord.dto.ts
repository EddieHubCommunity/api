import { PartialType } from '@nestjs/mapped-types';
import { CreateDiscordDto } from './create-discord.dto';

export class UpdateDiscordDto extends PartialType(CreateDiscordDto) {}
