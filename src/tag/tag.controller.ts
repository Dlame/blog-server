import { Controller, Get, Post, Body } from '@nestjs/common';
import { TagService } from './tag.service';
import { Result } from 'src/common/result.interface';
import { CreateTagDto } from './dto/create-tag.dto';

@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Get()
  async find(): Promise<Result> {
    const tagList = await this.tagService.getTagList();
    return { code: '01', message: '查询成功', list: tagList.list };
  }

  @Post()
  async createTag(@Body() body: CreateTagDto): Promise<Result> {
    await this.tagService.createTag(body.name, body.imageUrl);
    return { code: '01', message: '创建成功' };
  }
}
