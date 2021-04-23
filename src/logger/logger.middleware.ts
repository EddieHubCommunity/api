import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly config: ConfigService) {}
  private readonly logger = new Logger(LoggerMiddleware.name);
  use(req: any, res: any, next: () => void) {
    try {
      if (JSON.parse(this.config.get('DEBUG'))) {
        const { body, method, url } = req;

        res.on('finish', () => {
          const { statusCode } = res;
          this.logger.log(
            `${statusCode} | [${method}] ${url} - ${JSON.stringify(body)}`,
          );
        });
        next();
      }
    } catch {
      next();
    }
  }
}
