import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { KeyspaceInterceptor } from './keyspace.interceptor';
import { KeyspaceService } from './keyspace.service';

describe('KeyspaceInterceptor', () => {
  const http = new HttpService();
  const config = new ConfigService();
  const keyspaceService = new KeyspaceService(http, config);
  it('should be defined', () => {
    expect(new KeyspaceInterceptor(keyspaceService)).toBeDefined();
  });
});
