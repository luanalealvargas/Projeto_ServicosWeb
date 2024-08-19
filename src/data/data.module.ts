import { MongooseModule } from "@nestjs/mongoose";
import { Link, LinkSchema } from "./schemas/link.schema";
import { Module } from "@nestjs/common";
import { Key, KeySchema } from "./schemas/key.schema";

@Module({
    imports: [MongooseModule.forFeature([{
        name: Link.name,
        schema: LinkSchema
    },
{
    name: Key.name,
    schema: KeySchema,
}])],
    exports:[MongooseModule]
})
export class DataModule {};