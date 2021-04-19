import { Module } from '@nestjs/common';
import { CombinedStrategy } from './Combined.strategy';
import { DiscordStrategy } from './Discord.strategy';
import { GithubStrategy } from './Github.strategy';

@Module({ providers: [GithubStrategy, DiscordStrategy, CombinedStrategy] })
export class AuthModule {}
