import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getRepository, Brackets } from 'typeorm';

import { format } from 'date-fns';

import { Article } from '../entities/article.entity';
import { QueryResult } from 'src/common/common.interface';
import { GetArticleDto } from './dtos/get-article.dto';
import { CreateArticleDto } from './dtos/create-article.dto';
import { ArticleTag } from 'src/entities/articleTag.entity';
import { ArticleCategory } from 'src/entities/articleCategory.entity';

@Injectable()
export class ArticleService {
	constructor(
		@InjectRepository(Article) private readonly articleRepo: Repository<Article>,
		@InjectRepository(ArticleTag) private readonly tagRepo: Repository<ArticleTag>,
		@InjectRepository(ArticleCategory) private readonly categoryRepo: Repository<ArticleCategory>
	) {}

	/**
	 * 新建文章
	 * @param article 文章实体
	 */
	async createArticle(body: CreateArticleDto): Promise<void> {
		const _article = await this.articleRepo.findOne({ title: body.title });
		if (_article) throw new HttpException('该文章已存在', 403);
		const article = new Article();
		// 赋值给article对象
		for (const key in body) {
			if (body[key] !== null || body[key] !== undefined || body[key] !== '') {
				article[key] = body[key];
			}
		}
		article.createdTime = format(new Date(), 'yyyy-MM-dd HH:mm:ss');
		await this.articleRepo.save(article);
		// 保存标签
		if (body.tags.length > 0) {
			for (const id of body.tags) {
				const tag = new ArticleTag();
				tag.tag_id = id;
				tag.article = article;
				await this.tagRepo.save(tag);
			}
		}
		// 保存分类
		if (body.categories.length > 0) {
			for (const id of body.categories) {
				const category = new ArticleCategory();
				category.category_id = id;
				category.article = article;
				await this.categoryRepo.save(category);
			}
		}
	}

	/**
	 * 获取文章列表
	 * @param query
	 */
	async getArticleList(query: GetArticleDto): Promise<QueryResult<Article>> {
		const qb = getRepository(Article).createQueryBuilder('article');
		qb.where('1=1');

		// 关键词搜索
		if ('keyword' in query) {
			qb.andWhere(
				new Brackets(_qb => {
					_qb
						.where('article.title LIKE :keyword', { keyword: `%${query.keyword}%` })
						.andWhere('article.content LIKE :keyword', { keyword: `%${query.keyword}%` });
				})
			);
		}
		// 标签
		if ('tag' in query) {
			qb.innerJoinAndSelect('article.tags', 'tag', 'tag.name = :tag', { tag: query.tag });
		}
		// 类别
		if ('category' in query) {
			qb.innerJoinAndSelect('article.category', 'category', 'category.name = :category', {
				category: query.category
			});
		}
		const count = await qb.getCount();
		const list = await qb.getMany();
		return { count, list };
	}

	/**
	 * 获取文章详情
	 * @param id 文章id
	 */
	async findById(id: number): Promise<Article> {
		return await this.articleRepo.findOne({
			relations: ['tags', 'categories', 'comments'],
			where: {
				id: id
			}
		});
	}
}
