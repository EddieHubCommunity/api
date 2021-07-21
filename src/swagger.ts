import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('EddieHubCommunity API')
  .setDescription('An API to manage our community data')
  .setVersion(process.env.npm_package_version)
  .addSecurity('token', {
    type: 'apiKey',
    in: 'header',
    name: 'Client-Token',
    description: 'Token for writing data',
  })
  .addBearerAuth({
    type: 'http',
    scheme: 'bearer',
    bearerFormat: 'JWT',
    description: 'Token for getting Data',
  })
  .build();
