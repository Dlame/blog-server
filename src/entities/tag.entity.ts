import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ comment: '标签名' })
  name: string;
  @Column({ comment: '标签图片地址' })
  tag_image: string;
}
