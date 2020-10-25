// Initializes the `discord` service on path `/discord`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Discord } from './discord.class';
import createModel from '../../models/discord.model';
import hooks from './discord.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'discord': Discord & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/discord', new Discord(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('discord');

  service.hooks(hooks);
}
