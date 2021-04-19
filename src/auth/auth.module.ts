import { Module } from '@nestjs/common';
import { DiscordStrategy } from './Discord.strategy';
import { GithubStrategy } from './Github.strategy';

@Module({ providers: [GithubStrategy, DiscordStrategy] })
export class AuthModule {}
