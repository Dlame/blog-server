import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Comment } from './comment.entity';
import { User } from './user.entity';

@Entity()
export class Reply {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ comment: '回复内容' })
  content: string;
  @Column({ type: 'date', comment: '回复时间' })
  createdTime: string;
  @Column({ type: 'date', comment: '回复更新时间', nullable: true })
  updatedTime: string;

  @ManyToOne(
    type => Comment,
    comment => comment.replies,
    {
      onDelete: 'CASCADE',
    },
  )
  comment: Comment;
  @ManyToOne(
    type => User,
    user => user.replies,
    {
      onDelete: 'CASCADE',
    },
  )
  user: User;
}
