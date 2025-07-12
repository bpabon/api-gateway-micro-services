import { BoomAdapter } from '../../plugins/hapi-boom.adapter.js';
import { BcryptAdapter } from '../../plugins/bcryptjs.adapter.js';
import { JwtAdapter } from '../../plugins/jwt.adapter.js';
import { config } from './../../config/config.js';
import { UserService } from '../user/user.service.js';
import { EmailService } from '../mail/mail.services.js';

export class AuthService {
    constructor() {
        this.signToken = new JwtAdapter();
        this.userService = new UserService();
        this.emailService = new EmailService();
    }
    // Buscar usuario por correo  y validar si la contraseña es valida
    async getUser(email, password) {
        const user =  await this.userService.findByEmail(email);
        if (!user) {
            throw BoomAdapter.unauthorized('El correo suministrado no existe.');
        }
        const passwordCorrecta = await this.verifyPassword(password, user.password);
        if (!passwordCorrecta) {
            throw BoomAdapter.unauthorized('Contraseña incorrecta.');
        }
        delete user.password;
        return user
    }
    // Verificar que las contraseñas sean las correctas
    async verifyPassword(plainPassword, hashedPassword) {
        return BcryptAdapter.compare(plainPassword, hashedPassword);
    }
    // Create a new jwt 
    async generateToken(user) {
        const payload = {
            id: user.id,
            email: user.email,
        }
        return await this.signToken.generateToken( payload, '6h');
    }
    // Verifique jwt
    async verifyJwt(token){
        return await this.signToken.validateToken(token);
    }
    // Check if the user has not changed the password.
    async checkAndChangePassword(decode, token='', password){
        const user = await this.userService.findOne(decode.id);
        if(!user){
            throw BoomAdapter.unauthorized('User not found.');
        }
        if(user.recovery_token !== token){
            throw BoomAdapter.unauthorized('Token mismatch');
        }
        if(user.recovery_token === null){
            throw BoomAdapter.unauthorized('The user has changed the password.');
        }
        const passwordCrypt = await this.encryptPassword(password);
        const userChanged = await this.userService.update(user.id, {password: passwordCrypt, recovery_token: null});
        return userChanged;
    }
    // Encriptar password
    async encryptPassword(password) {
        return BcryptAdapter.hash(password);
    }
    // Valid email and send email with token for change password
    async sendRecovery(email){
        const user = await this.userService.findByEmail(email);
        if (!user) {
            throw BoomAdapter.unauthorized('El correo suministrado no existe.');
        }
        const token = await this.generateToken(user, '1h');
        const url = `${config.urlPublic}/auth/change-password/${token}`;
        await this.userService.update(user.id, {recovery_token: token});
        const senMail = await this.emailService.sendEmail(user.email, 'Restablecimiento de Contraseña', {name: user.email, link: url}, 'RECOVERY_PASSWORD','v1');
        return senMail;
    }
}