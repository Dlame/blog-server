import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Comment } from './comment.entity';
import { Reply } from './reply.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ comment: '用户名' })
  username: string;
  @Column({ comment: '密码' })
  password: string;
  @Column({ comment: '邮箱' })
  email: string;
  @Column({ comment: '邮件通知', default: 0 })
  notice: number;
  @Column({ comment: '用户权限：1-admin 2-普通用户' })
  role: string;
  @Column({ comment: 'github账号', nullable: true })
  github: string;
  @Column({ comment: '是否禁言', default: 0 })
  disabledDiscuss: number;
  @Column({ type: 'date', comment: '用户创建时间' })
  createdTime: string;
  @Column({ type: 'date', comment: '用户更新时间', nullable: true })
  updatedTime: string;

  @OneToMany(
    type => Comment,
    comment => comment.user,
  )
  comments: Comment[];
  @OneToMany(
    type => Reply,
    reply => reply.user,
  )
  replies: Reply[];
}
