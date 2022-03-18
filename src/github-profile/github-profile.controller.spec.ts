import { ConfigModule } from '@nestjs/config';
import { getConnectionToken, MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { MongooseConfigService } from '../environment/mongo-config.service';
import { GithubProfileController } from './github-profile.controller';
import { Connection } from 'mongoose';
import {
  GithubProfileModel,
  GithubProfileSchema,
} from './schema/github-profile.schema';
import { HttpModule } from '@nestjs/axios';

describe('GithubProfileController', () => {
  let controller: GithubProfileController;
  let connection: Connection;

  afterEach(async () => {
    await connection.close();
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        HttpModule,
        MongooseModule.forRootAsync({
          useClass: MongooseConfigService,
        }),
        MongooseModule.forFeature([
          { name: GithubProfileModel.name, schema: GithubProfileSchema },
        ]),
        ConfigModule.forRoot({
          isGlobal: true,
        }),
      ],
      controllers: [GithubProfileController],
    }).compile();

    controller = module.get<GithubProfileController>(GithubProfileController);
    connection = await module.get(getConnectionToken());
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
