const { MigrationInterface, QueryRunner } = require('typeorm');

module.exports = class Weight1687930023017 {
  name = 'Weight1687930023017';

  async up(queryRunner) {
    await queryRunner.query(
      `CREATE TABLE \`weight_entity\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` timestamp(6) NOT NULL COMMENT '생성 시간' DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL COMMENT '변경 시간' DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` timestamp(6) NULL COMMENT '삭제 시간', \`date\` varchar(255) NOT NULL, \`afterWake\` int NOT NULL, \`beforeSleep\` int NOT NULL, \`userId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_entity\` DROP COLUMN \`birth\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_entity\` ADD \`birth\` date NOT NULL COMMENT '유저 생년월일'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`weight_entity\` ADD CONSTRAINT \`FK_4822274830a0d98d9a0145ded52\` FOREIGN KEY (\`userId\`) REFERENCES \`user_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  async down(queryRunner) {
    await queryRunner.query(
      `ALTER TABLE \`weight_entity\` DROP FOREIGN KEY \`FK_4822274830a0d98d9a0145ded52\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_entity\` DROP COLUMN \`birth\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_entity\` ADD \`birth\` varchar(255) NOT NULL COMMENT '유저 생년월일'`,
    );
    await queryRunner.query(`DROP TABLE \`weight_entity\``);
  }
};
