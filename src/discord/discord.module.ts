import { Module } from '@nestjs/common';
import { DiscordService } from './discord.service';
import { DiscordController } from './discord.controller';

@Module({
  controllers: [DiscordController],
  providers: [DiscordService],
})
export class DiscordModule {}
