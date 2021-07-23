import { HttpModule, Module } from '@nestjs/common';
import { KeyspaceService } from './keyspace.service';

@Module({
  imports: [HttpModule],
  providers: [KeyspaceService],
  exports: [KeyspaceService],
})
export class AstraApiModule {}
