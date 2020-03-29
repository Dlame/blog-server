import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getRepository } from 'typeorm';

import { Category } from 'src/entities/category.entity';
import { QueryResult } from 'src/common/common.interface';

@Injectable()
export class CategoryService {
  constructor(@InjectRepository(Category) private readonly categoryRepo: Repository<Category>) {}

  /**
   * 获取内容列表
   * @param query 文章id
   */
  async getCategoryList(): Promise<QueryResult<Category>> {
    const qb = getRepository(Category).createQueryBuilder('category');
    qb.groupBy('category.name');
    const count = await qb.getCount();
    const list = await qb.getMany();
    return { list, count };
  }
}
