import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Entity,
} from 'typeorm';

@Entity()
export class BaseTimeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({
    type: 'timestamp',
    comment: '생성 시간',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    comment: '변경 시간',
  })
  updatedAt: Date;

  @DeleteDateColumn({
    type: 'timestamp',
    comment: '삭제 시간',
  })
  deletedAt: Date;
}
