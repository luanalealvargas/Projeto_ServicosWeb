import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type KeyDocument =  HydratedDocument<Key>;

@Schema()
export class Key {
    _id: string;
    @Prop()
    key: string;
   
}

export const KeySchema = SchemaFactory.createForClass(Key)