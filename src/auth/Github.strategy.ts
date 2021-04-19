import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthGuard, PassportStrategy } from '@nestjs/passport';
import { UniqueTokenStrategy } from 'passport-unique-token';

@Injectable()
export class GithubStrategy extends PassportStrategy(
  UniqueTokenStrategy,
  'discord-strategy',
) {
  constructor(private config: ConfigService) {
    super({});
  }

  async validate(token: string, done) {
    if (token != this.config.get('APP_GITHUB_TOKEN')) {
      throw new UnauthorizedException();
    }
    return done(null, token);
  }
}
export const GithubGuard = AuthGuard('discord-strategy');
