import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthGuard, PassportStrategy } from '@nestjs/passport';
import { UniqueTokenStrategy } from 'passport-unique-token';

@Injectable()
export class DiscordStrategy extends PassportStrategy(
  UniqueTokenStrategy,
  'discord-strategy',
) {
  constructor(private config: ConfigService) {
    super({});
  }

  async validate(token: string, done) {
    if (token != this.config.get('APP_DISCORD_TOKEN')) {
      throw new UnauthorizedException();
    }
    return done(null, token);
  }
}
export const DiscordGuard = AuthGuard('discord-strategy');
