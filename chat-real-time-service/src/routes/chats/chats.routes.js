import { Router } from 'express';
import { ChatsController } from '../../controllers/chats/chats.controller.js';

export class ChatsRoutes {
  static get routes() {
    const router = Router();
    const chatController = new ChatsController();
    router.get('/join-rooms', chatController.joinRoom);
    return router;
  }
}