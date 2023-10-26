import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { RequestIdMiddleware } from './shared/middlewares/request-id.middleware';
import { VALIDATION_PIPE_OPTIONS } from './shared/constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe(VALIDATION_PIPE_OPTIONS)
  )
  app.use(RequestIdMiddleware);
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('VL HR')
    .setDescription('The VL HR API Docs')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);
  await app.listen(4000, () => {
    console.log(`App is running on port 4000`)
  });
}
bootstrap();
