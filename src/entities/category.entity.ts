import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Article } from './article.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ comment: '分类名' })
  name: string;

  @ManyToOne(
    type => Article,
    article => article.categories,
    {
      onDelete: 'CASCADE',
    },
  )
  article: Article;
}
