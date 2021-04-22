import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('EddieHubCommunity API')
  .setDescription('An API to manage our community data')
  .setVersion('0.0.1')
  .addSecurity('token', { type: 'apiKey', in: 'header', name: 'token' })
  .build();
