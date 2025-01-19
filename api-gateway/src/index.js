import { config } from "./config/config.js";
import {Server} from "./server.js";
import { ROUTES } from "./routes/index.routes.js";

(async () => { 
    new Server({
        port: config.PORT,
        routes: ROUTES,
    }).start();
})();