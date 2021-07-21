import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthGuard, PassportStrategy } from '@nestjs/passport';
import express from 'express';
import { UniqueTokenStrategy } from 'passport-unique-token';

@Injectable()
export class TokenStrategy extends PassportStrategy(
  UniqueTokenStrategy,
  'discordGithub-strategy',
) {
  constructor(private config: ConfigService) {
    super({
      tokenHeader: 'Client-Token',
      tokenQuery: 'Client-Token',
      passReqToCallback: true,
    });
  }

  validate(req: express.Request, token: string, done: any) {
    let userObject;
    const approvedTokens: Array<string> = this.config
      .get('APPROVED_TOKENS')
      .split(',');
    if (!approvedTokens.includes(token)) {
      throw new UnauthorizedException();
    }

    if (req.headers.keyspace) {
      userObject = { keyspace: req.headers.keyspace };
    }
    return done(null, userObject ? userObject : token);
  }
}
export const TokenGuard = AuthGuard('discordGithub-strategy');
