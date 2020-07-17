import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Article } from './article.entity';

@Entity()
export class ArticleTag {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ comment: '标签id' })
  tag_id: number;

  @ManyToOne(
    type => Article,
    article => article.tags,
    {
      onDelete: 'CASCADE',
    },
  )
  article: Article;
}
