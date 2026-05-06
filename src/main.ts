import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './common/filters/http-exception.filter';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

let app: (arg0: any, arg1: any) => any;

async function createApp() {
  const nestApp = await NestFactory.create<NestExpressApplication>(AppModule);

  nestApp.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads',
  });

  nestApp.enableCors();
  nestApp.setGlobalPrefix('api/v1');

  const config = new DocumentBuilder()
    .setTitle('NexLearn LMS API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(nestApp, config);

  SwaggerModule.setup('docs', nestApp, document, {
    useGlobalPrefix: true,
    customJs: [
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.min.js',
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.js',
    ],
    customCssUrl: [
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css',
    ],
  });

  nestApp.useGlobalFilters(new AllExceptionsFilter());
  nestApp.useGlobalInterceptors(new TransformInterceptor());

  nestApp.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  await nestApp.init();

  return nestApp.getHttpAdapter().getInstance();
}

export default async function handler(req: any, res: any) {
  if (!app) {
    app = await createApp();
  }
  return app(req, res);
}