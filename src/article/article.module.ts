import { Module } from '@nestjs/common';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from '../entities/article.entity';
import { Category } from '../entities/category.entity';
import { Comment } from '../entities/comment.entity';
import { Tag } from '../entities/tag.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Article, Category, Comment, Tag])],
  controllers: [ArticleController],
  providers: [ArticleService],
})
export class ArticleModule {}
