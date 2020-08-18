import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class SiteInfo {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ comment: '站点名' })
  site_name: string;
  @Column({ comment: '头像' })
  avatar: string;
  @Column({ comment: '简介' })
  slogan: string;
  @Column({ comment: '掘金' })
  juejin: string;
  @Column()
  github: string;
}
