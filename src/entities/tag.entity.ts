import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Article } from './article.entity';

@Entity()
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ comment: '标签名' })
  name: string;

  @ManyToOne(
    type => Article,
    article => article.tags,
    {
      onDelete: 'CASCADE',
    },
  )
  article: Article;
}
