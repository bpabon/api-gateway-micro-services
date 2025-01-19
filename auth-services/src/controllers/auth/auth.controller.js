import { catchAsync } from "../../helpers/catchAsync.helpers.js";
import { BoomAdapter } from "../../plugins/hapi-boom.adapter.js";
import { AuthService } from "../../services/auth/auth.service.js";
import { UserService } from "../../services/user/user.service.js";
// Reciben las solicitudes HTTP,  se encargará de recibir la solicitud de login y devolver la respuesta.
export class AuthController {
    constructor(
    ) {
        this.authService = new AuthService();
        this.userService = new UserService();
    }
    // Check user and password for authentication
    login = catchAsync(async (req, res, next) =>{
        const user = await this.authService.getUser(req.body.email, req.body.password);
        const jwt = await this.authService.generateToken(user);
        return res.status(200).json({token: jwt, msg: 'Login successful'});
    });
    // Create a new user in the database
    newUserController = catchAsync(async (req,res,next)=>{
        const newUser = await this.userService.create(req.body);
        if(newUser){
            return res.status(200).json({msg: 'El usuario se creado de forma correcta.'});
        }
        throw BoomAdapter.badRequest(`Ocurrió un error al crear el usuario.`);
    });
    // Send email for recovery password with url public
    sendEmailForRecoveryPassword = catchAsync(async (req,res,next)=>{ 
        const dataSendEmail = await this.authService.sendRecovery(req.body.email);
        if (!dataSendEmail) {
            throw BoomAdapter.notFound('No fue posible restablecer la contraseña');
        }
        return res.status(200).json({ msg: 'Se ha enviado un correo electrónico con un enlace para su cambio de contraseña.' });
    });
    // Update password for user
    changePasswordUserController = catchAsync(async (req, res, next)=>{
        const { token } = req.params;
        const decode = await this.authService.verifyJwt(token);
        if(!decode){
            throw BoomAdapter.unauthorized('Token is invalid');
        }
        const changeUser = await this.authService.checkAndChangePassword(decode, token, req.body.password);
        if(!changeUser){
            throw BoomAdapter.badRequest('Problem with change password');
        }
        return res.status(200).json({ msg: 'La contraseña se ha cambiado correctamente.' });
    });
}