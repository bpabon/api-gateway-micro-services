
import { EntitySchema } from "typeorm";

export default new EntitySchema({
    name: "Messages",
    tableName: "messages",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true,
        },
        content: {
            type: "text",
            nullable: false,
        },
        created_at: {
            type: "timestamp",
            createDate: true,
            nullable: false
        },
        id_user: {
            type: "int",
            nullable: false,
        },
        id_conversation: {
            type: "int",
            nullable: false,
        },
    },
    relations: {
        conversation: {
            target: 'Conversation',
            type: 'many-to-one',
            joinColumn: { name: 'id_conversation' },
            onDelete: 'CASCADE'
        }
        // user: {
        //     target: 'User',
        //     type: 'many-to-one',
        //     joinColumn: { name: 'id_user' },
        //     onDelete: 'CASCADE'
        // }
    }
});