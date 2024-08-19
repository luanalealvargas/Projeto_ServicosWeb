import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectConnection, InjectModel } from "@nestjs/mongoose";
import { generate } from "generate-password";
import { Connection, Model, ObjectId } from "mongoose";
import { Link } from "src/data/schemas/link.schema";

@Injectable()
export class LinkService {
    constructor(@InjectModel(Link.name) private linkModel: Model<Link>, @InjectConnection() private connection:Connection){}
    async create(link: string): Promise<{id:string, generated_link:string}>{
        const session = await this.connection.startSession({defaultTransactionOptions:{}});
        try {
            session.startTransaction({})
            const exp_date = new Date();
            exp_date.setMonth(exp_date.getMonth() + 1)
            let is_unique = true;
            let short_link
            do {
                short_link = generate({
                    numbers: true,
                    length:4
                })
                is_unique = await this.linkModel.findOne({short_link}).exec() == null;
            }
            while(!is_unique)
                
                     
            const createdLink =  new this.linkModel({original_link:link,short_link, exp_date})
            await createdLink.save();
            await session.commitTransaction();
            await session.endSession()
            return {
                id: createdLink._id,
                generated_link: `http://${process.env.HOST}/${short_link}`
            }
        } catch (error) {
            await session.abortTransaction();
            await session.endSession()
            throw error;
        }
       
        
    }
    async find(id: string):Promise<Link>{
        const link = await this.linkModel.findById(id).exec();
        if (link ===null)
            throw new NotFoundException('Link não encontrado')
        return link.toObject();
    }
    async delete(id:string): Promise<void> {
        const linkDeleteResult = await  this.linkModel.deleteOne({_id:id}).exec();
        if(linkDeleteResult.deletedCount < 1)
            throw new NotFoundException('Link não encontrado')
    }
    async update(id:string, new_link:string):Promise<void>{
        const link = await this.linkModel.findById(id).exec();
        if (link ===null)
            throw new NotFoundException('Link não encontrado')
        link.original_link = new_link;
        await link.save();
    }
    async handleView(slug:string){
        const session = await this.connection.startSession({defaultTransactionOptions:{}});
        try {
            session.startTransaction({})
            const link = await this.linkModel.findOne({short_link:slug}).exec();
            if (link ===null){
                session.abortTransaction()
                throw new NotFoundException('Link não encontrado')

            }
            link.views =  link.views +1;
            link.save();
            session.commitTransaction();
            return link.original_link;
        } catch (error) {
            
        }session.abortTransaction()
        session.endSession()
       
    }
}