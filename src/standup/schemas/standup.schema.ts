import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ _id: false })
export class StandupAuthor extends Document {
  @Prop()
  platform: string;

  @Prop()
  uid: string;
}

@Schema()
export class Standup extends Document {
  @Prop()
  todayMessage: string;

  @Prop()
  yesterdayMessage: string;

  @Prop({ type: StandupAuthor, required: true })
  author: StandupAuthor;
}

export const StandupSchema = SchemaFactory.createForClass(Standup);
