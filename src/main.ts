// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'; // <-- IMPORTE ESTAS LINHAS

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // INÍCIO DO CÓDIGO DO SWAGGER
  const config = new DocumentBuilder()
    .setTitle('API de Empacotamento L2Code')
    .setDescription('API para resolver o desafio de empacotamento de caixas.')
    .setVersion('1.0')
    .addTag('packing')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  // FIM DO CÓDIGO DO SWAGGER

  await app.listen(3000);
}
bootstrap();