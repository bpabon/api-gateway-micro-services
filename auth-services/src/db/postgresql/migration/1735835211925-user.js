
export class User1735835211925 {

    async up(queryRunner) {
        await queryRunner.query( `
        CREATE TABLE "user" (
            "id" SERIAL PRIMARY KEY, -- ID del usuario (clave primaria, auto-incremental)
            "email" VARCHAR(100) NOT NULL UNIQUE, -- Correo electrónico del usuario (único)
            "password" VARCHAR(100) NOT NULL, -- Contraseña del usuario
            "recovery_token" VARCHAR(250), -- Token de recuperación de contraseña (puede ser nulo)
            "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP -- Fecha de creación del registro (sin necesidad de 'AT TIME ZONE')
            );
        -- Comentarios para la tabla y columnas
        COMMENT ON TABLE "user" IS 'Tabla de usuarios';
        COMMENT ON COLUMN "user"."id" IS 'ID del usuario (clave primaria, auto-incremental)';
        COMMENT ON COLUMN "user"."email" IS 'Correo electrónico del usuario (único)';
        COMMENT ON COLUMN "user"."password" IS 'Contraseña del usuario';
        COMMENT ON COLUMN "user"."recovery_token" IS 'Token de recuperación de contraseña (puede ser nulo)';
        COMMENT ON COLUMN "user"."created_at" IS 'Fecha de creación del registro';
        ` );
    }

    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "user"`);
    }
}
