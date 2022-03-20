import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModel, UserSchema } from '../user/schema/user.schema';
import { TokenStrategy } from '../auth/token.strategy';
import { GeocodingService } from './geocoding.service';
import { GithubController } from './github.controller';
import { GithubProfileService } from './github-profile.service';
import {
  GithubProfileModel,
  GithubProfileSchema,
} from './schema/github-profile.schema';
import {
  GithubEventModel,
  GithubEventSchema,
} from './schema/github-event.schema';
import { GithubEventService } from './github-event.service';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([
      { name: UserModel.name, schema: UserSchema },
      { name: GithubProfileModel.name, schema: GithubProfileSchema },
      { name: GithubEventModel.name, schema: GithubEventSchema },
    ]),
  ],
  controllers: [GithubController],
  providers: [
    GithubProfileService,
    GithubEventService,
    GeocodingService,
    TokenStrategy,
  ],
})
export class GithubModule {}
