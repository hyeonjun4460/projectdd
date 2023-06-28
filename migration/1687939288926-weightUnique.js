const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class WeightUnique1687939288926 {
    name = 'WeightUnique1687939288926'

    async up(queryRunner) {
        await queryRunner.query(`CREATE UNIQUE INDEX \`weight unique keys\` ON \`weight_entity\` (\`date\`, \`userId\`)`);
    }

    async down(queryRunner) {
        await queryRunner.query(`DROP INDEX \`weight unique keys\` ON \`weight_entity\``);
    }
}
