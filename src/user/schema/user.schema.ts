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
export class GithubProfile extends Document {
  @Prop({ required: true })
  _id: string;

  @Prop({ type: Location })
  location: Location;
}

export const GithubProfileSchema = SchemaFactory.createForClass(GithubProfile);

@Schema({ _id: false, timestamps: true })
export class UserModel extends Document {
  @Prop({ required: true })
  _id: string;

  @Prop()
  bio: string;

  @Prop()
  avatar: string;

  @Prop()
  type: string;

  @Prop({ ref: GithubProfile.name })
  github: string;
}

export const UserSchema = SchemaFactory.createForClass(UserModel);
