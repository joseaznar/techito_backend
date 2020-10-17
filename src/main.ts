import { NestFactory } from '@nestjs/core';
import { DocumentBuilder } from '@nestjs/swagger/dist/document-builder';
import { SwaggerModule } from '@nestjs/swagger/dist/swagger-module';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const origin = '*';
  app.enableCors({ origin });

  const options = new DocumentBuilder()
    .setTitle('TECHito API')
    .setDescription('The TECHito API documentation for the Hackathon BBVA 2020')
    .setVersion('1.0')
    .addTag('questions')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
