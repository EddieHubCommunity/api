import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true, expires: '2m' })
export class GithubEventModel extends Document {
  @Prop({ required: true })
  githubUsername: string;

  @Prop({ type: String, required: true })
  event: string;
}

export const GithubEventSchema = SchemaFactory.createForClass(GithubEventModel);
