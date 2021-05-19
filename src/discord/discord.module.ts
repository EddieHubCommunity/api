import { Module } from '@nestjs/common';
import { DiscordService } from './discord.service';
import { DiscordController } from './discord.controller';
import { AuthModule } from '../auth/auth.module';
import { AstraModule } from '@cahllagerfeld/nestjs-astra';
import { CommonsModule } from '../commons/commons.module';

@Module({
  imports: [
    CommonsModule,
    AuthModule,
    AstraModule.forFeature({ namespace: 'eddiehub', collection: 'discord' }),
  ],
  controllers: [DiscordController],
  providers: [DiscordService],
})
export class DiscordModule {}
