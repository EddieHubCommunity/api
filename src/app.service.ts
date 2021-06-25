import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return `Currently running version: ${process.env.npm_package_version}`;
  }
}
