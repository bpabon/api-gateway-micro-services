import { Router } from 'express';
import { JwtController } from '../../controllers/auth/jwt.controller.js';

export class JwtRoutes {
  static get routes() {
    const router = Router();
    const jwtController = new JwtController();
    router.get('/validate', jwtController.ValidateJwt);
    router.get('/validate', jwtController.ValidateJwtChangePassword);
    return router;
  }
}