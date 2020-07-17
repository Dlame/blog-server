import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getRepository } from 'typeorm';

import { Tag } from 'src/entities/tag.entity';
import { QueryResult } from 'src/common/common.interface';

@Injectable()
export class TagService {
  constructor(@InjectRepository(Tag) private readonly tagRepo: Repository<Tag>) {}

  async createTag(name: string): Promise<void> {
    const tag = new Tag();
    tag.name = name;
    await this.tagRepo.insert(tag);
  }

  /**
   * 获取标签列表
   */
  async getTagList(): Promise<QueryResult<Tag>> {
    const qb = getRepository(Tag).createQueryBuilder('tag');
    qb.groupBy('tag.name');
    const count = await qb.getCount();
    const list = await qb.getMany();
    return { list, count };
  }
}
