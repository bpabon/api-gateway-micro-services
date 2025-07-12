import { catchAsync } from "../../helpers/catchAsync.helpers.js";
import { AuthService } from "../../services/auth/auth.service.js";
// Reciben las solicitudes HTTP, y validar los datos del JWT 
export class JwtController {
    constructor(
    ) {
        this.authService = new AuthService();
    }
    ValidateJwt = catchAsync(async (req, res, next) =>{
        const token = req.headers['x-token']??'';
        const result = await this.authService.verifyJwt(token);
        return res.status(200).json({token: result});
    });
    ValidateJwtChangePassword = catchAsync(async (req, res, next) =>{
        const token = req.headers['x-token']??'';
        const result = await this.authService.verifyJwt(token);
        return res.status(200).json({token: result});
    });
}