import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DiscordModule } from './discord/discord.module';
import { StandupModule } from './standup/standup.module';

@Module({
  imports: [DiscordModule, StandupModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
