import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type LinkDOcument =  HydratedDocument<Link>;

@Schema()
export class Link {
    _id: string;
    @Prop()
    original_link: string;
    @Prop({unique:true})
    short_link: string;
    @Prop()
    exp_date: Date;
    @Prop({default:0})
    views: number;
}

export const LinkSchema = SchemaFactory.createForClass(Link)