import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export const AuthorObject = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): Author => {
    const request: Request = ctx.switchToHttp().getRequest();
    const uid = request.headers['user-uid'] || undefined;
    const platform = request.headers['platform'] || undefined;

    return { uid, platform };
  },
);

export interface Author {
  uid: string | string[] | undefined;
  platform: string | string[] | undefined;
}
