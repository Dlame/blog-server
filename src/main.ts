import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { join } from 'path';
import 'reflect-metadata';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, { cors: true });
  await app.listen(8000);
  // mvc配置
  app.useStaticAssets(join(__dirname, '..', 'public'));
  // 处理跨域
  // app.enableCors();
}
bootstrap();
