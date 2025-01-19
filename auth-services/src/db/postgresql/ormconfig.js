import path from "path";
import { DataSource } from "typeorm";
import { config } from "../../config/config.js"; // Ajusta la ruta si es necesario
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const AppDataSource = new DataSource({
  type: "postgres",
  logging: (config.env === 'development' || config.env === 'e2e') ? console.log : false,
  url: config.dbUrl,
  synchronize: config.isDev, // No puede ser `true` en producción
  entities: [path.join(__dirname, './entity/**/*.js')],
  migrations: [path.join(__dirname, './migration/**/*.js')],
  cli: {
    migrationsDir: path.join(__dirname, './migration'),
    entitiesDir: path.join(__dirname, './entity'),
  }
});

