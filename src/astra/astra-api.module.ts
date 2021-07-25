import { HttpModule, Module } from '@nestjs/common';
import { AstraService } from './astra.service';
import { KeyspaceService } from './keyspace.service';

@Module({
  imports: [HttpModule],
  providers: [KeyspaceService, AstraService],
  exports: [KeyspaceService, AstraService],
})
export class AstraApiModule {}
