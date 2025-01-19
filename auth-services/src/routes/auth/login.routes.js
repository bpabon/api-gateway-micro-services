import { Router } from 'express';
import { JoiAdapter } from '../../plugins/joi.adapter.js';
import { emailRecoveryPassword, loginAuth, registryUser, getToken,changePassword } from "../../middlewares/schemas/auth/login.schema.js";
import { AuthController } from '../../controllers/auth/auth.controller.js';
import { validUniqueUserMiddleware } from '../../middlewares/auth/user.middleware.js';

export class AuthRoutes {
  static get routes() {
    const router = Router();
    const authController = new AuthController();
    router.post('/login', [JoiAdapter.validate(loginAuth, 'body')], authController.login);
    router.post('/registerUser', [JoiAdapter.validate(registryUser, 'body'), validUniqueUserMiddleware], authController.newUserController);
    router.post('/recoveryPassword', [JoiAdapter.validate(emailRecoveryPassword, 'body')], authController.sendEmailForRecoveryPassword);
    router.put('/changePassword/:token', [
      JoiAdapter.validate(getToken, 'params'),
      JoiAdapter.validate(changePassword, 'body')
    ], authController.changePasswordUserController);
    return router;
  }
}