import { ConfigModule } from '@nestjs/config';
import { getConnectionToken, MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Connection } from 'mongoose';
import {
  GithubProfileModel,
  GithubProfileSchema,
} from '../github/schema/github-profile.schema';
import { MongooseConfigService } from '../environment/mongo-config.service';
import { UserModel, UserSchema } from './schema/user.schema';
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
        MongooseModule.forFeature([
          { name: UserModel.name, schema: UserSchema },
          { name: GithubProfileModel.name, schema: GithubProfileSchema },
        ]),
        ConfigModule.forRoot({
          isGlobal: true,
        }),
      ],
      providers: [UserService],
    }).compile();

    service = module.get<UserService>(UserService);
    connection = await module.get(getConnectionToken());
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
