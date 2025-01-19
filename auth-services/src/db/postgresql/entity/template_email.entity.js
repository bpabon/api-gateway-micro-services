import { EntitySchema } from "typeorm";

export default new EntitySchema({
  name: "Template_emails",
  tableName: "template_emails",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    status: {
      type: "enum",
      enum: ['Activo', 'Inactivo'], 
      enumName: 'estado_enum',
      default: 'Activo',
      nullable: false,  
    },
    codigo: {
      type: "varchar",
      length: 100, 
    },
    version: {
      type: "varchar",
      length: 10, 
      nullable: false, 
    },
    template: {
        type: "text",
        nullable: false, 
    },
    created_at: {
      type: "timestamp",
      default: () => 'CURRENT_TIMESTAMP',
    },
  },
});