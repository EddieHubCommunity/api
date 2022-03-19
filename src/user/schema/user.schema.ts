import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { GithubProfileModel } from '../../github-profile/schema/github-profile.schema';
import { Document } from 'mongoose';

@Schema({ _id: false, timestamps: true })
export class UserModel extends Document {
  @Prop({ required: true })
  _id: string;

  @Prop()
  bio: string;

  @Prop()
  avatar: string;

  @Prop({ ref: GithubProfileModel.name })
  github: string;
}

export const UserSchema = SchemaFactory.createForClass(UserModel);
