import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { getConnectionToken, MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Connection } from 'mongoose';
import { MongooseConfigService } from '../environment/mongo-config.service';
import { GeocodingService } from './geocoding.service';
import { GithubProfileService } from './github-profile.service';
import {
  GithubProfile,
  GithubProfileSchema,
  UserModel,
  UserSchema,
} from './schema/user.schema';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let connection: Connection;

  afterEach(async () => {
    await connection.close();
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRootAsync({
          useClass: MongooseConfigService,
        }),
        HttpModule,
        MongooseModule.forFeature([
          { name: UserModel.name, schema: UserSchema },
          { name: GithubProfile.name, schema: GithubProfileSchema },
        ]),
        ConfigModule.forRoot({
          isGlobal: true,
        }),
      ],
      providers: [UserService, GeocodingService, GithubProfileService],
    }).compile();

    service = module.get<UserService>(UserService);
    connection = await module.get(getConnectionToken());
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
