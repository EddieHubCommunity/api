import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export class Location {
  @Prop()
  provided: string;

  @Prop()
  lat: number;

  @Prop()
  long: number;
}

@Schema({ _id: false, timestamps: false })
export class GithubProfileModel extends Document {
  @Prop({ required: true })
  _id: string;

  @Prop({ type: Location })
  location: Location;
}

export const GithubProfileSchema =
  SchemaFactory.createForClass(GithubProfileModel);
