const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class Addweightcomment1688019884000 {
    name = 'Addweightcomment1688019884000'

    async up(queryRunner) {
        await queryRunner.query(`DROP INDEX \`weight unique keys\` ON \`weight_entity\``);
        await queryRunner.query(`ALTER TABLE \`weight_entity\` CHANGE \`date\` \`date\` varchar(255) NOT NULL COMMENT '체중 기록 날짜'`);
        await queryRunner.query(`ALTER TABLE \`weight_entity\` CHANGE \`afterWake\` \`afterWake\` int NOT NULL COMMENT '기상 후 체중'`);
        await queryRunner.query(`ALTER TABLE \`weight_entity\` CHANGE \`beforeSleep\` \`beforeSleep\` int NOT NULL COMMENT '취침 전 체중'`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`weight unique keys\` ON \`weight_entity\` (\`date\`, \`userId\`)`);
    }

    async down(queryRunner) {
        await queryRunner.query(`DROP INDEX \`weight unique keys\` ON \`weight_entity\``);
        await queryRunner.query(`ALTER TABLE \`weight_entity\` CHANGE \`beforeSleep\` \`beforeSleep\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`weight_entity\` CHANGE \`afterWake\` \`afterWake\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`weight_entity\` CHANGE \`date\` \`date\` varchar(255) NOT NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`weight unique keys\` ON \`weight_entity\` (\`date\`, \`userId\`)`);
    }
}
