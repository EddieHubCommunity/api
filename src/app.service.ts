import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private config: ConfigService) {}

  getHello(): string {
    return `Welcome to EddieHub! Currently running version: ${
      this.config.get('VERSION') || 'v0.0.0'
    }`;
  }
}
