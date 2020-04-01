import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Category } from './category.entity';
import { Comment } from './comment.entity';
import { Tag } from './tag.entity';

@Entity()
export class Article {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ comment: '文章标题' })
  title: string;
  @Column({ type: 'text', comment: '文章内容' })
  content: string;
  @Column({ comment: '阅读数', default: 0 })
  viewCount: number;
  @Column({ type: 'date', comment: '文章创作时间' })
  createdTime: string;
  @Column({ type: 'date', comment: '文章更新时间', nullable: true })
  updatedTime: string;

  @OneToMany(
    type => Category,
    category => category.article,
  )
  categories: Category[];
  @OneToMany(
    type => Comment,
    comment => comment.article,
  )
  comments: Comment[];
  @OneToMany(
    type => Tag,
    tag => tag.article,
  )
  tags: Tag[];
}
