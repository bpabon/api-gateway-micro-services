import express from "express";
import corsAdapter from "./middlewares/cors.js";
import compressionPlugin from "./middlewares/compression.js"
import { config } from "./config/config.js";
import setupRateLimitAdapter from "./middlewares/express-rate-limit.js";
import setupMorganAdapter from "./middlewares/morgan.js"
import setupHelmet from "./middlewares/helmet.js"
import setupProxies from "./middlewares/proxy.js"
import { routeErrors, logErrors,errorHandler,ormErrorHandler,boomErrorHandler } from "./middlewares/error.js";

export class Server {
    constructor(options){
        const { port, routes } = options;
        this.app = express();
        this.port = port; 
        this.routes = routes;
    }
    async start() {
        
        corsAdapter(this.app);
        compressionPlugin(this.app);
        setupHelmet(this.app);
        setupMorganAdapter(this.app);
        // Usar las rutas definidas
        setupRateLimitAdapter(this.app, this.routes);
        setupProxies(this.app, this.routes);
        // Middleware de error de ruta
        this.app.use(routeErrors);
        this.app.use(logErrors);
        this.app.use(ormErrorHandler);
        this.app.use(boomErrorHandler);
        this.app.use(errorHandler);
        // Escuchar el puerto
        this.app.listen(this.port, () => {
            if(config.isDev){
                console.log(`App is running on ${this.port}`);
            }
        });
    }
}