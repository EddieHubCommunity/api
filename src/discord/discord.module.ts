import { Module } from '@nestjs/common';
import { DiscordService } from './discord.service';
import { DiscordController } from './discord.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Discord } from './discord.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Discord])],
  controllers: [DiscordController],
  providers: [DiscordService],
})
export class DiscordModule {}
