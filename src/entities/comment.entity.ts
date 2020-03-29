import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { Article } from './article.entity';
import { Reply } from './reply.entity';
import { User } from './user.entity';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ comment: '评论内容' })
  content: string;
  @Column({ type: 'date', comment: '评论时间' })
  createdTime: string;
  @Column({ type: 'date', comment: '评论更新时间', nullable: true })
  updatedTime: string;

  @ManyToOne(
    type => Article,
    article => article.comments,
    {
      onDelete: 'CASCADE',
    },
  )
  article: Article;
  @ManyToOne(
    type => User,
    user => user.comments,
    {
      onDelete: 'CASCADE',
    },
  )
  user: User;

  @OneToMany(
    type => Reply,
    reply => reply.comment,
  )
  replies: Reply[];
}
