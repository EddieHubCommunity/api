import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { KeyspaceService } from './keyspace.service';

@Module({
  imports: [HttpModule],
  providers: [KeyspaceService],
  exports: [KeyspaceService],
})
export class AstraApiModule {}
