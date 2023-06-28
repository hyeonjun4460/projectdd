import { Entity, Column, ManyToOne, Unique } from 'typeorm';
import { BaseTimeEntity } from './base-time.entity';
import { UserEntity } from './user.entity';

@Entity()
@Unique('weight unique keys', ['date', 'user'])
export class WeightEntity extends BaseTimeEntity {
  @Column()
  date: string;

  @Column()
  afterWake: number;

  @Column()
  beforeSleep: number;

  @ManyToOne(() => UserEntity, (user) => user.weight)
  user: UserEntity;
}
