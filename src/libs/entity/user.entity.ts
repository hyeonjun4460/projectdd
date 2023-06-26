import { Entity, Column } from 'typeorm';
import { BaseTimeEntity } from './base-time.entity';

@Entity()
export class UserEntity extends BaseTimeEntity {
  @Column({ type: 'varchar', comment: '유저 이름' })
  userName: string;

  @Column({ type: 'varchar', comment: 'password' })
  password: string;

  @Column({ type: 'date', comment: '유저 생년월일' })
  birth: Date;

  @Column({ type: 'boolean', comment: '관리자 여부' })
  admin: boolean;
}
