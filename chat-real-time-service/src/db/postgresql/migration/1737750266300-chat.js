export class Rooms1737750266300 {

    async up(queryRunner) {
        await queryRunner.query(`
        CREATE TYPE typeConversation AS ENUM ('PRIVADA', 'GRUPO');
        CREATE TABLE conversation (
            id SERIAL PRIMARY KEY,
            type typeConversation NOT NULL,
            created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP 
        );
        COMMENT ON TABLE conversation IS 'Tabla de conversaciones';
        COMMENT ON COLUMN conversation.id IS 'ID de la conversación (clave primaria, auto-incremental)';
        COMMENT ON COLUMN conversation.type IS 'Tipos de conversación(PRIVADA, GRUPO)';
        COMMENT ON COLUMN conversation.created_at IS 'Fecha de creación del registro';
        
        CREATE TABLE messages (
            id SERIAL PRIMARY KEY,
            content TEXT NOT NULL,
            created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP, 
            id_conversation INT NOT NULL,
            id_user INT NOT NULL,
            FOREIGN KEY (id_conversation) REFERENCES conversation(id) ON DELETE CASCADE
            -- FOREIGN KEY (id_user) REFERENCES user(id) ON DELETE CASCADE
        );

        COMMENT ON TABLE messages IS 'Tabla de mensajes';
        COMMENT ON COLUMN messages.id IS 'Identificador único (clave primaria, auto-incremental)';
        COMMENT ON COLUMN messages.content IS 'Cuerpo del mensaje que se envió';
        COMMENT ON COLUMN messages.created_at IS 'Fecha de creación del registro';
        COMMENT ON COLUMN messages.id_conversation IS 'Relación con la tabla conversation';
        COMMENT ON COLUMN messages.id_user IS 'Relación con la tabla user que pertenece a otro servicio';
     
        CREATE TABLE rooms (
            id SERIAL PRIMARY KEY,
            user_admin INT NOT NULL,
            name_room VARCHAR(100) NOT NULL,
            created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP  
            -- FOREIGN KEY (user_admin) REFERENCES user(id) ON DELETE CASCADE
        );

        COMMENT ON TABLE rooms IS 'Tabla de las salas o grupos';
        COMMENT ON COLUMN rooms.id IS 'Identificador único (clave primaria, auto-incremental)';
        COMMENT ON COLUMN rooms.user_admin IS 'Relación con la tabla user referencia al usuario que creo el registro alojado en el servicio de AUTH';
        COMMENT ON COLUMN rooms.created_at IS 'Fecha de creación del registro';
        COMMENT ON COLUMN rooms.name_room IS 'Nombre que se le asigno a la sala o grupo';

        CREATE TABLE participation (
            id_usuario INT NOT NULL,
            id_conv INT NOT NULL,
            created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP, 
            PRIMARY KEY (id_usuario, id_conv),
            -- FOREIGN KEY (id_usuario) REFERENCES user(id) ON DELETE CASCADE,
            FOREIGN KEY (id_conv) REFERENCES conversation(id) ON DELETE CASCADE
        ); 

        COMMENT ON TABLE participation IS 'Tabla de las participaciones de los usuarios en las conversaciones';
        COMMENT ON COLUMN participation.id_usuario IS 'Relación con la tabla user que se tiene en el servicio de AUTH';
        COMMENT ON COLUMN participation.id_conv IS 'Relación con la tabla conversation';
        COMMENT ON COLUMN participation.created_at IS 'Fecha de creación del registro';

        `);
    }

    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE IF EXISTS participation`);
        await queryRunner.query(`DROP TABLE IF EXISTS rooms`);
        await queryRunner.query(`DROP TABLE IF EXISTS messages`);
        await queryRunner.query(`DROP TABLE IF EXISTS conversation`);
        // Eliminar el tipo de datos (ENUM) solo si ya no se está utilizando
        await queryRunner.query(`DROP TYPE IF EXISTS typeConversation`);
    }

}