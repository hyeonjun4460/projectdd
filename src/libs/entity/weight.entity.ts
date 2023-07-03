import { Entity, Column, ManyToOne, Unique, Relation } from 'typeorm';
import { BaseTimeEntity } from './base-time.entity';
import { UserEntity } from './user.entity';

@Entity()
@Unique('weight unique keys', ['date', 'user'])
export class WeightEntity extends BaseTimeEntity {
  @Column({ type: 'date', comment: '체중 기록 날짜' })
  date: string;

  @Column({ type: 'int', comment: '기상 후 체중' })
  afterWake: number;

  @Column({ type: 'int', comment: '취침 전 체중' })
  beforeSleep: number;

  @ManyToOne(() => UserEntity, (user) => user.weight, { nullable: false })
  user: Relation<UserEntity>;
}
