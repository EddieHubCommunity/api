import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { KeyspaceService } from './keyspace.service';
import { KeyspaceInterceptor } from './keyspace.interceptor';

@Module({
  imports: [HttpModule],
  providers: [KeyspaceService, KeyspaceInterceptor],
  exports: [KeyspaceService],
})
export class AstraApiModule { }
