
import { EntitySchema } from "typeorm";

export default new EntitySchema({
    name: "Rooms",
    tableName: "rooms",
    columns: {
        id: {
            type: "int",
            primary: true,
            generated: true,
        },
        user_admin: {
            type: "int",
            nullable: false,
        },
        name_rooms: {
            type: "varchar",
            length: 100,
            nullable: false,
        },
        created_at: {
            type: "timestamp",
            createDate: true,
            nullable: false
        },
    },
    // relations: {
    //     admin: {
    //         target: 'User',
    //         type: 'many-to-one',
    //         joinColumn: { name: 'user_admin' },
    //         onDelete: 'CASCADE'
    //     }
    // }
});