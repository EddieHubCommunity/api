import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TokenStrategy } from '../auth/token.strategy';
import { StandupController } from './standup.controller';
import { StandupService } from './standup.service';
import { Standup, StandupSchema } from './schemas/standup.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Standup.name, schema: StandupSchema }]),
  ],
  controllers: [StandupController],
  providers: [StandupService, TokenStrategy],
})
export class StandupModule {}
