import { DynamicModule, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PresentationModule } from './presentation/apresentation.module';
import { Mongoose } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { LinkService } from './service/link.service';
import { ConfigModule } from '@nestjs/config';
import ApiKeyService from './service/api_key.service';
console.log(process.env.DATABASE_USER)
@Module({
  imports: [ConfigModule.forRoot(),PresentationModule, MongooseModule.forRoot('mongodb://localhost', {
    auth: {
      password: process.env.DATABASE_PASSWORD,
      username: process.env.DATABASE_USER
    },
    dbName: 'encurta'
  })],
  controllers: [AppController],
  providers: [ApiKeyService],
})
export class AppModule {
 constructor(private apiKeyService: ApiKeyService){
  apiKeyService.generateKey()
 
 }
}
