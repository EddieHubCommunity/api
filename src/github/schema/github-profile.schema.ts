import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export class Location {
  @Prop()
  provided: string;

  @Prop()
  lat: number;

  @Prop()
  long: number;
}

export class Events {
  @Prop(
    raw({
      type: Map,
      of: Number,
    }),
  )
  events?: Map<string, number> | null;
}

@Schema({ _id: false, timestamps: true })
export class GithubProfileModel extends Document {
  @Prop({ required: true })
  _id: string;

  @Prop({ type: Location })
  location: Location;

  @Prop({ type: Events })
  events: Events;
}

export const GithubProfileSchema =
  SchemaFactory.createForClass(GithubProfileModel);
