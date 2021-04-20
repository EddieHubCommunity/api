import { Module } from '@nestjs/common';
import { DiscordGithubStrategy } from './discordGithub.strategy';
@Module({ providers: [DiscordGithubStrategy] })
export class AuthModule {}
