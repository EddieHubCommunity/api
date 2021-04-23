import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly config: ConfigService) {}
  private readonly logger = new Logger(LoggerMiddleware.name);
  use(req: Request, res: Response, next: () => void) {
    try {
      if (JSON.parse(this.config.get('DEBUG'))) {
        const { body, method, originalUrl } = req;

        res.on('finish', () => {
          const { statusCode } = res;
          this.logger.log(
            `${statusCode} | [${method}] ${originalUrl} - ${JSON.stringify(
              body,
            )}`,
          );
        });
      }
      next();
    } catch {
      next();
    }
  }
}
