import { Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { hash } from "bcrypt";
import { generate } from "generate-password";
import { Model } from "mongoose";
import { Key } from "src/data/schemas/key.schema";

@Injectable()
export default class ApiKeyService {
    private readonly logger = new Logger(ApiKeyService.name);
    constructor(@InjectModel(Key.name) private keyModel: Model<Key>,){}
    async generateKey(){
        let key = process.env.KEY ? process.env.KEY : generate({
            symbols: true,
            numbers: true,
            length: 15
        });
   
       this.logger.log(`API KEY🔑: ${key}`)
        const generatedKey =  new this.keyModel({key});
        await generatedKey.save();

    }
    async checkKey (key:string): Promise<boolean> {
        const hasKey = await this.keyModel.findOne({key}).exec();
        return hasKey !=null;
    }
}