import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ _id: false })
export class SocialItemSchema extends Document {
  @Prop()
  name: string;

  @Prop()
  url: string;
}

@Schema({ _id: false })
export class SocialsSchema extends Document {
  @Prop({ type: SocialItemSchema })
  github: SocialItemSchema;

  @Prop({ type: SocialItemSchema })
  twitter: SocialItemSchema;

  @Prop({ type: SocialItemSchema })
  youtube: SocialItemSchema;

  @Prop({ type: SocialItemSchema })
  Paypal: SocialItemSchema;

  @Prop({ type: SocialItemSchema })
  blog: [SocialItemSchema];
}

@Schema({ _id: false })
export class MilestoneModel extends Document {
  @Prop()
  title: string;

  @Prop()
  date: string;

  @Prop()
  icon: string;

  @Prop()
  color: string;

  @Prop()
  description: string;

  @Prop()
  url: string;
}

export const MilestoneSchema = SchemaFactory.createForClass(MilestoneModel);

@Schema({ _id: false })
export class Profile extends Document {
  @Prop({ _id: true })
  _id: string;

  @Prop()
  bio: string;

  @Prop()
  avatarURL: string;

  @Prop({ type: SocialsSchema })
  profiles: SocialsSchema;

  @Prop({ type: [MilestoneSchema] })
  milestones: MilestoneModel[];

  @Prop()
  createdOn: string;

  @Prop()
  lastModifiedOn: string;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);
