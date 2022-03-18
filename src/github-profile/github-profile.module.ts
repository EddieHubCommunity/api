import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModel, UserSchema } from '../user/schema/user.schema';
import { TokenStrategy } from '../auth/token.strategy';
import { GeocodingService } from './geocoding.service';
import { GithubProfileController } from './github-profile.controller';
import { GithubProfileService } from './github-profile.service';
import {
  GithubProfileModel,
  GithubProfileSchema,
} from './schema/github-profile.schema';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([
      { name: UserModel.name, schema: UserSchema },
      { name: GithubProfileModel.name, schema: GithubProfileSchema },
    ]),
  ],
  controllers: [GithubProfileController],
  providers: [GithubProfileService, GeocodingService, TokenStrategy],
})
export class GithubProfileModule {}
