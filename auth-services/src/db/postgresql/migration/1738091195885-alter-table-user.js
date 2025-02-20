 export class AlterTableUser1738091195885 {

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "user"
ADD connection boolean DEFAULT false;`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "user"
            DROP COLUMN connection;`);
    }

}
