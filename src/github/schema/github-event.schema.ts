import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { GithubProfileModel } from './github-profile.schema';

@Schema({ timestamps: true, expires: '2m' })
export class GithubEventModel extends Document {
  @Prop({ required: true, ref: GithubProfileModel.name })
  githubUsername: string;

  @Prop({ type: String, required: true })
  event: string;
}

export const GithubEventSchema = SchemaFactory.createForClass(GithubEventModel);
