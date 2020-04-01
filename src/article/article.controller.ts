import { Controller, Get, Query, Post, Body } from '@nestjs/common';
import { ArticleService } from './article.service';

import { Result } from 'src/common/result.interface';

import { GetArticleDto } from './dtos/get-article.dto';
import { CreateArticleDto } from './dtos/create-article.dto';

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get()
  async findAll(@Query() query: GetArticleDto): Promise<Result> {
    const data = await this.articleService.getArticleList(query);
    return { code: '01', message: '查询成功', ...data };
  }

  @Post()
  async createArticle(@Body() body: CreateArticleDto): Promise<Result> {
    await this.articleService.createArticle(body);
    return { code: '01', message: '创建成功' };
  }
}
