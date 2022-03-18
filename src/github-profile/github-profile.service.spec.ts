import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { getConnectionToken, MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Connection } from 'mongoose';
import { MongooseConfigService } from '../environment/mongo-config.service';
import { GeocodingService } from './geocoding.service';
import { GithubProfileService } from './github-profile.service';
import {
  GithubProfileModel,
  GithubProfileSchema,
} from './schema/github-profile.schema';

describe('GithubProfileService', () => {
  let service: GithubProfileService;
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
          { name: GithubProfileModel.name, schema: GithubProfileSchema },
        ]),
        ConfigModule.forRoot({
          isGlobal: true,
        }),
      ],
      providers: [GithubProfileService, GeocodingService],
    }).compile();

    service = module.get<GithubProfileService>(GithubProfileService);
    connection = await module.get(getConnectionToken());
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
