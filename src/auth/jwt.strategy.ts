import { Injectable } from '@nestjs/common';
import { AuthGuard, PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';
import { TokenPayload } from './interfaces/token-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }
  validate(payload: TokenPayload): TokenPayload {
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
