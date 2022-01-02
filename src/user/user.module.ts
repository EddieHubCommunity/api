import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TokenStrategy } from '../auth/token.strategy';
import { GeocodingService } from './geocoding.service';
import {
  GithubProfile,
  GithubProfileSchema,
  UserModel,
  UserSchema,
} from './schema/user.schema';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { GithubProfileService } from './github-profile.service';
import { UserContextController } from './user-context.controller';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([
      { name: UserModel.name, schema: UserSchema },
      { name: GithubProfile.name, schema: GithubProfileSchema },
    ]),
  ],
  controllers: [UserController, UserContextController],
  providers: [
    UserService,
    GeocodingService,
    TokenStrategy,
    GithubProfileService,
  ],
})
export class UserModule {}
