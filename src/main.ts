import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
  .setTitle('Encurta')
  .setDescription('API desenvolvida para gerenciar links encurtados em um projeto de Frameworks Backend e Frontend. A API oferece funcionalidades para criar, visualizar, atualizar e excluir links encurtados, além de redirecionar usuários para URLs originais e monitorar a contagem de cliques.')
  .setVersion('1.0')
  .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
 app.useGlobalPipes(new ValidationPipe())
  await app.listen(3000);
}
bootstrap();
