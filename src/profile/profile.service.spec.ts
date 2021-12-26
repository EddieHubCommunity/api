import { ConfigModule } from '@nestjs/config';
import { getConnectionToken, MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Connection } from 'mongoose';
import { MongooseConfigService } from '../environment/mongo-config.service';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { Profile, ProfileSchema } from './schemas/profile.schema';

describe('ProfileService', () => {
  let service: ProfileService;
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
          { name: Profile.name, schema: ProfileSchema },
        ]),
        ConfigModule.forRoot({
          isGlobal: true,
        }),
      ],
      controllers: [ProfileController],
      providers: [ProfileService],
    }).compile();

    service = module.get<ProfileService>(ProfileService);
    connection = await module.get(getConnectionToken());
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
