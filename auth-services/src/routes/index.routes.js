import { Router } from 'express';
import { AuthRoutes } from './auth/login.routes.js';
import { JwtRoutes } from './auth/jwt.routes.js';

// Definir todas mis rutas principales
export class AppRoutes {
    static get routes() {
        const router = Router();
        router.use('/v1', router);
        router.use('/api', AuthRoutes.routes )
        router.use('/jwt', JwtRoutes.routes )
        return router;
    }
}