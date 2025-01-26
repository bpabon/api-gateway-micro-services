import { Router } from 'express';
import { ChatsRoutes } from './chats/chats.routes.js';

// Definir todas mis rutas principales
export class AppRoutes {
    static get routes() {
        const router = Router();
        router.use('/v1', router);
        router.use('/chat', ChatsRoutes.routes )
        return router;
    }
}