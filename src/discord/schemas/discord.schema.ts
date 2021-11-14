import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({ _id: false })
export class DiscordAuthor extends Document {
    @Prop()
    platform: string;

    @Prop()
    uid: string;
}

@Schema({ _id: false, strict: false })
export class DiscordSocials extends Document {
    @Prop()
    name: string;

    @Prop()
    platform: string;

    @Prop()
    url: string;
}

@Schema({ _id: false })
export class Discord extends Document {

    @Prop({ required: true })
    _id: string

    @Prop({ required: false })
    bio: string

    @Prop({ type: DiscordAuthor, required: true })
    author: DiscordAuthor;

    @Prop()
    createdOn: string;

    @Prop({ type: Array })
    socials: DiscordSocials[]
}

export const DiscordSchema = SchemaFactory.createForClass(Discord)
