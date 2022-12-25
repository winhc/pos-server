import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule } from '@nestjs/swagger';
// import { join } from 'path';
import swaggerConfig from 'swagger.config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // app.useStaticAssets(join(__dirname, '..', 'files'),{
  //   index: false,
  //   prefix: '/files'
  // });
  // app.useStaticAssets(join(__dirname, '..', 'avatars'));
  app.useGlobalPipes(new ValidationPipe());

  const port = process.env.PORT || 3000;
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('/', app, document);
  // app.enableCors({
  //   origin: ['http://localhost:9527'],
  //   methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  //   allowedHeaders: ['Authorization', 'Content-Type']
  // });
  app.enableCors();
  await app.listen(port);
  console.log(`Server is listening on ${await app.getUrl()}`)
}
bootstrap();
