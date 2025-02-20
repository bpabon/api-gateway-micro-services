import "reflect-metadata";
import express from "express";
import { createServer } from "http";
import { WssService } from "./services/sockets/wss.service.js";
import corsAdapter from "./plugins/cors.adapter.js";
import compressionAdapter from "./plugins/compression.adapter.js"
import { config } from "./config/config.js";
import helmetAdapter from "./plugins/helmet.adapter.js"
import logger from "./plugins/winston.adapter.js";
import { routeErrors, logErrors, errorHandler, ormErrorHandler, boomErrorHandler } from "./middlewares/errors/errors.js";
import { AppDataSource } from './db/postgresql/ormconfig.js'


export class Server {
  constructor(options) {
    const { port, routes } = options;
    this.routes = routes;
    this.port = port;
    this.app = this.createApp();
    this.server = createServer(this.app);
  }
  // Escuchar el puerto
  async start() {
    await this.sockets();
    // await this.connectionOrm();
    this.server.listen(this.port, () => {
      if (config.isDev) {
        logger.info(`App real time is running on ${this.port}`);
      }
    });
  }
  // Middlewares
  async middlewares(app) {
    app.use(express.json()); // raw JSON
    app.use(express.urlencoded({ extended: true })); // x-www-form-urlencoded
    app.use(express.json({ limit: '20mb' }));
    corsAdapter(app);
    compressionAdapter(app);
    helmetAdapter(app);
  }
  // Routes project
  async routesProject(app) {
    app.use(this.routes);
    app.use(routeErrors);
  }
  // Error middleware
  async errors(app) {
    app.use(logErrors);
    app.use(ormErrorHandler);
    app.use(boomErrorHandler);
    app.use(errorHandler);
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
  async close() {
    this.server?.close();
  }
  async createApp() {
    const app = express();
    await this.middlewares(app);
    await this.routesProject(app);
    await this.connectionOrm();
    await this.errors(app);
    return app;
  }
  async sockets() {
    WssService.initWss({ server: this.server, path: '/rooms' });
  }
}