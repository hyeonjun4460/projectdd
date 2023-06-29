import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseTimeEntity } from './base-time.entity';
import { UserEntity } from './user.entity';

@Entity()
export class DietEntity extends BaseTimeEntity {
  @Column({ type: 'varchar', comment: '음식 이름', nullable: true })
  foodName: string;

  @Column({ type: 'int', comment: '음식 양', nullable: true })
  foodAmount: string;

  @Column({ type: 'varchar', comment: '아침/점심/저녁', nullable: true })
  category: string;

  @Column({ type: 'time', comment: '식사 시간', nullable: true })
  time: string;

  @Column({ type: 'date', comment: '날짜', nullable: true })
  date: string;

  @Column({ type: 'varchar', comment: '식사 장소', nullable: true })
  place: string;

  @Column({ type: 'longtext', comment: '식사 소감', nullable: true })
  impression: string;

  @Column({ type: 'boolean', comment: '식사 여부', nullable: false })
  have: boolean;

  @ManyToOne(() => UserEntity, (user) => user.diet)
  user: UserEntity;
}
