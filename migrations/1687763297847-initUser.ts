import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitUser1687763297847 implements MigrationInterface {
  name = 'InitUser1687763297847';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`user_entity\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` timestamp(6) NOT NULL COMMENT '생성 시간' DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL COMMENT '변경 시간' DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` timestamp(6) NULL COMMENT '삭제 시간', \`userName\` varchar(255) NOT NULL COMMENT '유저 이름', \`password\` varchar(255) NOT NULL COMMENT 'password', \`birth\` date NOT NULL COMMENT '유저 생년월일', \`admin\` tinyint NOT NULL COMMENT '관리자 여부', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`user_entity\``);
  }
}
