import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthGuard, PassportStrategy } from '@nestjs/passport';
import { UniqueTokenStrategy } from 'passport-unique-token';

@Injectable()
export class DiscordGithubStrategy extends PassportStrategy(
  UniqueTokenStrategy,
  'discordGithub-strategy',
) {
  constructor(private config: ConfigService) {
    super({});
  }

  async validate(token: string, done) {
    const approvedTokens: Array<string> = this.config
      .get('APPROVED_TOKENS')
      .split(',');
    if (!approvedTokens.includes(token)) {
      throw new UnauthorizedException();
    }
    return done(null, token);
  }
}
export const DiscordGithubGuard = AuthGuard('discordGithub-strategy');
