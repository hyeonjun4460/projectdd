const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class IniDiet1688024256944 {
    name = 'IniDiet1688024256944'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE \`diet_entity\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` timestamp(6) NOT NULL COMMENT '생성 시간' DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL COMMENT '변경 시간' DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` timestamp(6) NULL COMMENT '삭제 시간', \`foodName\` varchar(255) NULL COMMENT '음식 이름', \`foodAmount\` int NULL COMMENT '음식 양', \`category\` varchar(255) NULL COMMENT '아침/점심/저녁', \`time\` time NULL COMMENT '식사 시간', \`date\` date NULL COMMENT '날짜', \`place\` varchar(255) NULL COMMENT '식사 장소', \`impression\` longtext NULL COMMENT '식사 소감', \`have\` tinyint NOT NULL COMMENT '식사 여부', \`userId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`diet_entity\` ADD CONSTRAINT \`FK_c4e1b9b91b3988b9ea1df8c9aec\` FOREIGN KEY (\`userId\`) REFERENCES \`user_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`diet_entity\` DROP FOREIGN KEY \`FK_c4e1b9b91b3988b9ea1df8c9aec\``);
        await queryRunner.query(`DROP TABLE \`diet_entity\``);
    }
}
