import { Entity, Column, ManyToOne } from 'typeorm';
import { BaseTimeEntity } from './base-time.entity';
import { UserEntity } from './user.entity';

@Entity()
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
