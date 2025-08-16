
import { EntitySchema } from "typeorm";

export default new EntitySchema({
    name: "Conversation",
    tableName: "conversation",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true,
            unique: true
        },
        type: {
            type: "enum",
            enum: ['PRIVADA', 'GRUPO'],  // Definir los valores del ENUM
            nullable: false,  // Aseguramos que no sea NULL
        },
        created_at: {
            type: "timestamp",
            createDate: true,
            nullable: false
        },
    },
    checks: [
        {
            expression: `type IN ('PRIVADA', 'GRUPO')`
        }
    ],
    // relations: {
    //     conversationRelation: {
    //         target: 'Messages',
    //         type: 'one-to-many',
    //         inverseSide: 'conversationMessagesRelation',
    //     },
    // },
});