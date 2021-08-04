import { Injectable } from '@nestjs/common';
import {
  AstraConfig,
  StargateConfig,
  DatastaxOptionsFactory,
} from '@cahllagerfeld/nestjs-astra';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AstraConfigService implements DatastaxOptionsFactory {
  constructor(private readonly config: ConfigService) {}
  createDatastaxOptions(): AstraConfig | StargateConfig {
    if (this.config.get('STARGATE_BASEURL')) {
      if (this.config.get('STARGATE_AUTH_TOKEN')) {
        return {
          baseUrl: this.config.get('STARGATE_BASEURL'),
          authToken: this.config.get('STARGATE_AUTH_TOKEN'),
          baseApiPath: this.config.get('STARGATE_BASE_API_PATH'),
        };
      }
      return {
        baseUrl: this.config.get('STARGATE_BASEURL'),
        username: this.config.get('STARGATE_USERNAME'),
        password: this.config.get('STARGATE_PASSWORD'),
        baseApiPath: this.config.get('STARGATE_BASE_API_PATH'),
        authUrl: this.config.get('STARGATE_AUTH_URL'),
      };
    }
    return {
      applicationToken: this.config.get('ASTRA_APPLICATION_TOKEN'),
      astraDatabaseId: this.config.get('ASTRA_DATABASE_ID'),
      astraDatabaseRegion: this.config.get('ASTRA_DATABASE_REGION'),
    };
  }
}
