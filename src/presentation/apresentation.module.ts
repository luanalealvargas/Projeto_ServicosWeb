import { Module } from '@nestjs/common';
import EncurtaController from './encurta.controller';
import { LinkService } from 'src/service/link.service';
import { DataModule } from 'src/data/data.module';
import ApiKeyService from 'src/service/api_key.service';

@Module({
  imports: [DataModule,],
  controllers: [EncurtaController],
  providers: [LinkService, ApiKeyService],
  exports:[LinkService, DataModule]
})
export class PresentationModule {}
