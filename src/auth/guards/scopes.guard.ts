import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { TokenPayload } from '../interfaces/token-payload.interface';

@Injectable()
export class ScopesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    const scopes = this.reflector.get<string[]>('scopes', context.getHandler());
    if (!scopes) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user as TokenPayload;
    return this.matchScopes(scopes, user);
  }
  private matchScopes(scopes: string[], user: any) {
    if (scopes.every((scope: string) => user.scopes.includes(scope)))
      return true;
    throw new ForbiddenException();
  }
}
