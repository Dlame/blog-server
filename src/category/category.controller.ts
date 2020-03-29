import { Controller, Get } from '@nestjs/common';
import { Category } from '../entities/category.entity';
import { CategoryService } from './category.service';
import { Result } from 'src/common/result.interface';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get('list')
  async findById(): Promise<Result<Category>> {
    const categoryList = await this.categoryService.getCategoryList();
    return { code: '01', msg: '查询成功', list: categoryList.list, count: categoryList.count };
  }
}
