import "reflect-metadata";
import express from "express";
import corsAdapter from "./plugins/cors.adapter.js";
import compressionAdapter from "./plugins/compression.adapter.js"
import { config } from "./config/config.js";
import helmetAdapter from "./plugins/helmet.adapter.js"
import { routeErrors, logErrors, errorHandler, ormErrorHandler, boomErrorHandler } from "./middlewares/errors/errors.js";
import { AppDataSource } from './db/postgresql/ormconfig.js'
import logger from "./plugins/winston.adapter.js";
import process from 'process'; 


export class Server {
  constructor(options) {
    const { port, routes } = options;
    this.app = express();
    this.port = port;
    this.serverListener;
    this.routes = routes;
  }
  // Escuchar el puerto
  async start() {
    await this.middlewares();
    await this.routesProject();
    await this.connectionOrm();
    await this.errors();
    this.serverListener = this.app.listen(this.port, () => {
      if (config.isDev) {
        logger.info(`App is running on ${this.port}`);
      }
      logger.debug(`App is running on ${this.port}`);
    });
  }
  // Middlewares
  async middlewares(){
    this.app.use(express.json()); // raw JSON
    this.app.use(express.urlencoded({ extended: true })); // x-www-form-urlencoded
    this.app.use(express.json({ limit: '20mb' }));
    corsAdapter(this.app);
    compressionAdapter(this.app);
    helmetAdapter(this.app);
  }
  // Routes project
  async routesProject() {
    this.app.use(this.routes);
    // // Error of routes
    this.app.use(routeErrors);
  }
  // Error middleware
  async errors() {
    this.app.use(logErrors);
    this.app.use(ormErrorHandler);
    this.app.use(boomErrorHandler);
    this.app.use(errorHandler);
  }

  async connectionOrm() {
    try {
      await AppDataSource.initialize()
        .then(() => {
          if (config.isDev) {
            logger.info(`Conexión exitosa a la base de datos!`);
          }
        }).catch(err => {
          logger.error(`Error connecting to the database ${err.message}`);
          process.exit(1);
        });
    } catch (error) {
      throw new Error(error.message);
    }
  }
  close() {
    this.serverListener?.close();
  }
}