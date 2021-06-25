import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('EddieHubCommunity API')
  .setDescription('An API to manage our community data')
  .setVersion(process.env.npm_package_version)
  .addSecurity('token', { type: 'apiKey', in: 'header', name: 'Client-Token' })
  .build();
