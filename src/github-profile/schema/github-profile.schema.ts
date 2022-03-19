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

export class Stats {
  @Prop(
    raw({
      type: Map,
      of: Number,
    }),
  )
  stats?: Map<string, number> | null;
}

@Schema({ _id: false, timestamps: true })
export class GithubProfileModel extends Document {
  @Prop({ required: true })
  _id: string;

  @Prop({ type: Location })
  location: Location;

  @Prop({ type: Stats })
  stats: Stats;
}

export const GithubProfileSchema =
  SchemaFactory.createForClass(GithubProfileModel);
