import { Module } from '@nestjs/common';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from '../entities/article.entity';
import { Comment } from '../entities/comment.entity';
import { ArticleTag } from '../entities/articleTag.entity';
import { ArticleCategory } from '../entities/articleCategory.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Article, ArticleCategory, Comment, ArticleTag])],
  controllers: [ArticleController],
  providers: [ArticleService],
})
export class ArticleModule {}
