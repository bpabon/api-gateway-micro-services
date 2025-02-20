export class ValuesTypesConversations1738083234192 {

    async up(queryRunner) {
        await queryRunner.query(` INSERT INTO conversation (type) 
            VALUES ('PRIVADA'),('GRUPO');`);
    }

    async down(queryRunner) {
        await queryRunner.query(` DELETE FROM conversation WHERE type IN('PRIVADA','GRUPO');`);
    }

}
