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
  .addSecurity('github-webhook', {
    type: 'apiKey',
    in: 'header',
    name: 'X-Hub-Signature-256',
    description: 'Webhook Secret from Github',
  })
  .build();
