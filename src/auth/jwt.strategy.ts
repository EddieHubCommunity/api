import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard, PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { TokensService } from './tokens.service';
import { TokenPayload } from './interfaces/token-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly tokensService: TokensService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.SECRET,
    });
  }
  validate(payload: TokenPayload): TokenPayload {
    if (!this.tokensService.validateClient(payload))
      throw new UnauthorizedException();
    return payload;
  }
}

export const JWTGuard = AuthGuard('jwt');

// export class MyAuthGuard extends AuthGuard(['jwt', 'discordGithub-strategy']) {
//   constructor() {
//     super();
//   }
//   canActivate(ctx: ExecutionContext) {
//     return super.canActivate(ctx);
//   }
// }
