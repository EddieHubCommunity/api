import { Module } from '@nestjs/common';
import { DiscordService } from './discord.service';
import { DiscordController } from './discord.controller';
import { AuthModule } from '../auth/auth.module';
import { AstraService as AstraApiService } from '../astra/astra.service';
import { AstraApiModule } from '../astra/astra-api.module';

@Module({
  imports: [AuthModule, AstraApiModule],
  controllers: [DiscordController],
  providers: [DiscordService, AstraApiService],
})
export class DiscordModule { }
