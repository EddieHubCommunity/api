import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { LoggerMiddleware } from './logger/logger.middleware';
import { MongooseModule } from '@nestjs/mongoose';
import { MongooseConfigService } from './environment/mongo-config.service';
import { UserModule } from './user/user.module';
import { GithubProfileModule } from './github-profile/github-profile.module';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useClass: MongooseConfigService,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserModule,
    GithubProfileModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('/');
  }
}
