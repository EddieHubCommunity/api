import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TokenStrategy } from '../auth/token.strategy';
import { UserModel, UserSchema } from './schema/user.schema';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import {
  GithubProfileModel,
  GithubProfileSchema,
} from '../github/schema/github-profile.schema';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard } from '@nestjs/throttler';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserModel.name, schema: UserSchema },
      { name: GithubProfileModel.name, schema: GithubProfileSchema },
    ]),
  ],
  controllers: [UserController],
  providers: [
    UserService,
    TokenStrategy,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class UserModule {}
