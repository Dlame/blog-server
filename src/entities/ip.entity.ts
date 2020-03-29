import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ comment: 'ip地址' })
  name: string;
  @Column({ comment: '是否可用', default: 1 })
  auth: number;
}
