import { Module } from '@nestjs/common';
import { DiscordService } from './discord.service';
import { DiscordController } from './discord.controller';
import { AuthModule } from '../auth/auth.module';
import { AstraService } from '../astra/astra.service';

@Module({
  imports: [AuthModule],
  controllers: [DiscordController],
  providers: [DiscordService, AstraService],
})
export class DiscordModule {}
