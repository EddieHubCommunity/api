import { Module } from '@nestjs/common';
import { DiscordService } from './discord.service';
import { DiscordController } from './discord.controller';
import { AstraModule } from '@cahllagerfeld/nestjs-astra';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    AuthModule,
    AstraModule.forFeature({ namespace: 'eddiehub', collection: 'discord' }),
  ],
  controllers: [DiscordController],
  providers: [DiscordService],
})
export class DiscordModule {}
