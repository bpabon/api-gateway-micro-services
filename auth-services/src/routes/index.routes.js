import { Router } from 'express';
import { AuthRoutes } from './auth/login.routes.js';

// Definir todas mis rutas principales
export class AppRoutes {

    static get routes() {

        const router = Router();
        router.use('/v1', router);
        router.use('/api', AuthRoutes.routes )
        return router;
    }


}