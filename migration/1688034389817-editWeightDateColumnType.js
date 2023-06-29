const { MigrationInterface, QueryRunner } = require('typeorm');

module.exports = class EditWeightDateColumnType1688034389817 {
  name = 'EditWeightDateColumnType1688034389817';

  async up(queryRunner) {
    await queryRunner.query(
      `DROP INDEX \`weight unique keys\` ON \`weight_entity\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`weight_entity\` DROP COLUMN \`date\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`weight_entity\` ADD \`date\` date NOT NULL COMMENT '체중 기록 날짜'`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`weight unique keys\` ON \`weight_entity\` (\`date\`, \`userId\`)`,
    );
  }

  async down(queryRunner) {
    await queryRunner.query(
      `DROP INDEX \`weight unique keys\` ON \`weight_entity\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`weight_entity\` DROP COLUMN \`date\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`weight_entity\` ADD \`date\` varchar(255) NOT NULL COMMENT '체중 기록 날짜'`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`weight unique keys\` ON \`weight_entity\` (\`date\`, \`userId\`)`,
    );
  }
};
