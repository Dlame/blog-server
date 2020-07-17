import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Article } from './article.entity';

@Entity()
export class ArticleCategory {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ comment: '分类id' })
  category_id: number;

  @ManyToOne(
    type => Article,
    article => article.categories,
    {
      onDelete: 'CASCADE',
    },
  )
  article: Article;
}
