
import { EntitySchema } from "typeorm";

export default new EntitySchema({
  name: "User",
  tableName: "user",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    email: {
      type: "varchar",
      length: 100, 
      nullable: false, 
      unique: true, 
    },
    password: {
      type: "varchar",
      length: 100, 
    },
    recovery_token: {
      type: "varchar",
      length: 250, 
      nullable: true, 
    },
    connection:{
      type: "boolean",
    },
    created_at: {
      type: "timestamp",
      default: () => 'CURRENT_TIMESTAMP',
    },
  },
});