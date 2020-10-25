// discord-model.ts - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
import { Application } from '../declarations';
import { Model, Mongoose } from 'mongoose';

export default function (app: Application): Model<any> {
  const modelName = 'discord';
  const mongooseClient: Mongoose = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const schema = new Schema({
    username: { type: String, required: true },
    avatar: { type: String, required: false },
    bio: { type: String, required: false },
    socials: {
      youtube: { type: String, required: false },
      twitter: { type: String, required: false },
      github: { type: String, required: false },
      facebook: { type: String, required: false },
      blog: { type: String, required: false },
      linkedin: { type: String, required: false },
    },
    location: {
      lat: { type: Number, required: false },
      lon: { type: Number, required: false },
      icon: { type: String, required: false },
      displayName: { type: String, required: false },
    },
    joinedAt: { type: Date },
  }, {
    timestamps: true
  });

  // This is necessary to avoid model compilation errors in watch mode
  // see https://mongoosejs.com/docs/api/connection.html#connection_Connection-deleteModel
  if (mongooseClient.modelNames().includes(modelName)) {
    (mongooseClient as any).deleteModel(modelName);
  }
  return mongooseClient.model<any>(modelName, schema);
}
