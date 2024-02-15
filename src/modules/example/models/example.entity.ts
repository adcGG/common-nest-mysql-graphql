import { IsNotEmpty } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('example')
export class Example {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({
    comment: '测试名',
    default: '',
  })
  @IsNotEmpty()
  name: string;

  @Column({
    comment: '描述信息',
    nullable: true,
  })
  desc: string;

  @Column({
    comment: '描述信息',
    nullable: true,
  })
  tel: string;
}
