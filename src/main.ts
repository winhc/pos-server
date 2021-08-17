import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import swaggerConfig from 'swagger.config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('/', app, document);
  await app.listen(3000);
}
bootstrap();
