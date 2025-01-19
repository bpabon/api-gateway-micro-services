1. Clonar archivo **.env.template** y renombrar a **.env**.
2. Instalar dependencias.
```bash
npm install
```
3. Migraciones 
Crear Migraciones
npm run migration:create src/db/postgresql/migration/name-migration
- Modificar el archivo eliminar import y poner export class
Correr las migraciones
npm run migration:run
Ver el estado de las migraciones
npm run migration:show