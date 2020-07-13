import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';

import { HttpExceptionFilter } from './common/httpexception.filter';
import { ParamsValidationPipe } from './pipe/paramsValidation.pipe';
import { ArticleModule } from './article/article.module';
import { CategoryModule } from './category/category.module';
import { TagModule } from './tag/tag.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'blog',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      timezone: '+0800',
      logging: true,
    }),
    ArticleModule,
    TagModule,
    CategoryModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useClass: ParamsValidationPipe,
    },
    { provide: APP_FILTER, useClass: HttpExceptionFilter },
  ],
})
export class AppModule {
  constructor(private readonly connection: Connection) {}
}
