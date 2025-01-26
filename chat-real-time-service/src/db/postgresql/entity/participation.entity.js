
import { EntitySchema } from "typeorm";

export default new EntitySchema({
    name: "Participation",
    tableName: "participation",
    columns: {
        id_usuario: {
            type: "int",
            nullable: false,
        },
        id_conv: {
            type: 'int',
            primary: true
        },
        created_at: {
            type: "timestamp",
            createDate: true,
            nullable: false
        },
    },
    relations: {
        // usuario: {
        //     target: 'User',
        //     type: 'many-to-one',
        //     joinColumn: { name: 'id_usuario' },
        //     onDelete: 'CASCADE'
        // },
        conversation: {
            target: 'Conversation',
            type: 'many-to-one',
            joinColumn: { name: 'id_conv' },
            onDelete: 'CASCADE'
        }
    }
});