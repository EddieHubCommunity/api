import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Request } from 'express';
import { TokenPayload } from '../auth/interfaces/token-payload.interface';
import { KeyspaceService } from './keyspace.service';

@Injectable()
export class KeyspaceInterceptor implements NestInterceptor {
  private existingKeyspaces = [];
  constructor(private readonly keyspaceService: KeyspaceService) {}
  async intercept(context: ExecutionContext, next: CallHandler) {
    const request: Request = context.switchToHttp().getRequest();
    const user: TokenPayload = request.user as TokenPayload;
    if (this.existingKeyspaces.includes(user.keyspace)) return next.handle();

    await this.keyspaceService.createKeyspace(user.keyspace);
    this.existingKeyspaces = [...this.existingKeyspaces, user.keyspace];
    return next.handle();
  }
}
