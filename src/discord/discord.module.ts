import { Module } from '@nestjs/common';
import { DiscordService } from './discord.service';
import { DiscordController } from './discord.controller';
import { TokenStrategy } from '../auth/token.strategy';

@Module({
  controllers: [DiscordController],
  providers: [DiscordService, TokenStrategy],
})
export class DiscordModule { }
