import { Controller, Get } from '@nestjs/common';
import { TagService } from './tag.service';
import { Result } from 'src/common/result.interface';

@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Get('list')
  async findById(): Promise<Result> {
    const tagList = await this.tagService.getTagList();
    return { code: '01', message: '查询成功', list: tagList.list, count: tagList.count };
  }
}
