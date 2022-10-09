import fs from 'fs';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { swaggerConfig } from './swagger';
import * as helmet from 'helmet';

async function bootstrap() {
  // DigitalOcean Apps has cert as environment variable but Mongo needs a file path
  // Write Mongo cert file to disk
  fs.writeFileSync('cert.pem', process.env.CA_CERT!);

  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.use(helmet());

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(3000);
}
bootstrap();
