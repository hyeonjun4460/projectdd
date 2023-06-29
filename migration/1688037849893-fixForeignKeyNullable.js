const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class FixForeignKeyNullable1688037849893 {
    name = 'FixForeignKeyNullable1688037849893'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`weight_entity\` DROP FOREIGN KEY \`FK_4822274830a0d98d9a0145ded52\``);
        await queryRunner.query(`DROP INDEX \`weight unique keys\` ON \`weight_entity\``);
        await queryRunner.query(`ALTER TABLE \`weight_entity\` CHANGE \`userId\` \`userId\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`diet_entity\` DROP FOREIGN KEY \`FK_c4e1b9b91b3988b9ea1df8c9aec\``);
        await queryRunner.query(`DROP INDEX \`diet unique key\` ON \`diet_entity\``);
        await queryRunner.query(`ALTER TABLE \`diet_entity\` CHANGE \`userId\` \`userId\` int NOT NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`weight unique keys\` ON \`weight_entity\` (\`date\`, \`userId\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`diet unique key\` ON \`diet_entity\` (\`date\`, \`category\`, \`userId\`)`);
        await queryRunner.query(`ALTER TABLE \`weight_entity\` ADD CONSTRAINT \`FK_4822274830a0d98d9a0145ded52\` FOREIGN KEY (\`userId\`) REFERENCES \`user_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`diet_entity\` ADD CONSTRAINT \`FK_c4e1b9b91b3988b9ea1df8c9aec\` FOREIGN KEY (\`userId\`) REFERENCES \`user_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`diet_entity\` DROP FOREIGN KEY \`FK_c4e1b9b91b3988b9ea1df8c9aec\``);
        await queryRunner.query(`ALTER TABLE \`weight_entity\` DROP FOREIGN KEY \`FK_4822274830a0d98d9a0145ded52\``);
        await queryRunner.query(`DROP INDEX \`diet unique key\` ON \`diet_entity\``);
        await queryRunner.query(`DROP INDEX \`weight unique keys\` ON \`weight_entity\``);
        await queryRunner.query(`ALTER TABLE \`diet_entity\` CHANGE \`userId\` \`userId\` int NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`diet unique key\` ON \`diet_entity\` (\`date\`, \`category\`, \`userId\`)`);
        await queryRunner.query(`ALTER TABLE \`diet_entity\` ADD CONSTRAINT \`FK_c4e1b9b91b3988b9ea1df8c9aec\` FOREIGN KEY (\`userId\`) REFERENCES \`user_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`weight_entity\` CHANGE \`userId\` \`userId\` int NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`weight unique keys\` ON \`weight_entity\` (\`date\`, \`userId\`)`);
        await queryRunner.query(`ALTER TABLE \`weight_entity\` ADD CONSTRAINT \`FK_4822274830a0d98d9a0145ded52\` FOREIGN KEY (\`userId\`) REFERENCES \`user_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
}
