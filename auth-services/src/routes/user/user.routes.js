import { Router } from 'express';
import { UsersController } from "../../controllers/users/user.controller.js";
import { JoiAdapter } from '../../plugins/joi.adapter.js';
import { userConnected } from "../../middlewares/schemas/user/user.schema.js";
import { validateJwt } from "../../middlewares/jwt/jwt.middlewares.js";

export class UserRoutes {
  static get routes() {
    const router = Router();
    const userController = new UsersController();
    router.put('/updateConnection',[JoiAdapter.validate(userConnected, 'body'),validateJwt], userController.updateConnection);
    return router;
  }
}