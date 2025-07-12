import { Router } from 'express';
import { JwtController } from '../../controllers/auth/jwt.controller.js';
import { JoiAdapter } from '../../plugins/joi.adapter.js';
import { getToken } from '../../middlewares/schemas/auth/login.schema.js';

export class JwtRoutes {
  static get routes() {
    const router = Router();
    const jwtController = new JwtController();
    router.get('/validate', jwtController.ValidateJwt);
    router.get('/validate-jwt-params/:token',[
      JoiAdapter.validate(getToken, 'params'),
    ], jwtController.ValidateJwtParams);
    return router;
  }
}