import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DiscordModule } from './discord/discord.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: process.env.MONGODB_CONNECTION_STRING,
      database:
        process.env.NODE_ENV === 'test'
          ? process.env.MONGODB_DATABASE_TEST
          : process.env.MONGODB_DATABASE,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      ssl: false,
      useUnifiedTopology: true,
      useNewUrlParser: true,
      keepConnectionAlive: true,
    }),
    DiscordModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
