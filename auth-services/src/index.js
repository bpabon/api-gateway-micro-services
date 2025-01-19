import { config } from "./config/config.js";
import {Server} from "./server.js";
import { AppRoutes } from "./routes/index.routes.js";

(async () => { 
    const server  = new Server({
        port: config.PORT,
        routes: AppRoutes.routes,
    });
    await server.start();
})();