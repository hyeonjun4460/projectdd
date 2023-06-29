const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class Adddietuniquekey1688029603591 {
    name = 'Adddietuniquekey1688029603591'

    async up(queryRunner) {
        await queryRunner.query(`CREATE UNIQUE INDEX \`diet unique key\` ON \`diet_entity\` (\`date\`, \`category\`, \`userId\`)`);
    }

    async down(queryRunner) {
        await queryRunner.query(`DROP INDEX \`diet unique key\` ON \`diet_entity\``);
    }
}
