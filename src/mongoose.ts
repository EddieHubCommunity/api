import mongoose from 'mongoose';
import { Application } from './declarations';
import logger from './logger';

export default function (app: Application): void {
  mongoose.connect(
    app.get('mongodb'),
    { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true }
  )
    .then(() => console.log('Database connected...'))
    .catch(err => {
      logger.error(err);
      process.exit(1);
    });
  
  mongoose.Promise = global.Promise;

  app.set('mongooseClient', mongoose);
}
