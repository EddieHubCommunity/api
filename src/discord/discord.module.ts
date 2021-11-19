import { Module } from '@nestjs/common';
import { DiscordService } from './discord.service';
import { DiscordController } from './discord.controller';
import { TokenStrategy } from '../auth/token.strategy';
import { MongooseModule } from '@nestjs/mongoose';
import { Discord, DiscordSchema } from './schemas/discord.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Discord.name, schema: DiscordSchema }]),
  ],
  controllers: [DiscordController],
  providers: [DiscordService, TokenStrategy],
})
export class DiscordModule {}
