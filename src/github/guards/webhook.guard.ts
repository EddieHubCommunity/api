import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import * as crypto from 'crypto';

@Injectable()
export class GithubWebhookGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const secret = process.env.API_WEBHOOK_SECRET;
    const sigHeaderName = 'X-Hub-Signature-256';
    const sigHashAlg = 'sha256';
    const data = JSON.stringify(request.body);
    const sig = Buffer.from(request.get(sigHeaderName) || '', 'utf8');
    const hmac = crypto.createHmac(sigHashAlg, secret);
    const digest = Buffer.from(
      `${sigHashAlg}=${hmac.update(data).digest('hex')}`,
      'utf8',
    );
    if (sig.length !== digest.length || !crypto.timingSafeEqual(digest, sig)) {
      throw new UnauthorizedException();
    }
    return true;
  }
}
