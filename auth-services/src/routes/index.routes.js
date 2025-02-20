import { Router } from 'express';
import { AuthRoutes } from './auth/login.routes.js';
import { JwtRoutes } from './auth/jwt.routes.js';
import { UserRoutes } from './user/user.routes.js';

// Definir todas mis rutas principales
export class AppRoutes {
    static get routes() {
        const router = Router();
        router.use('/v1', router);
        router.use('/api', AuthRoutes.routes )
        router.use('/jwt', JwtRoutes.routes )
        router.use('/user', UserRoutes.routes)
        return router;
    }
}