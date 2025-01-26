import axios from 'axios';
import { config } from '../../config/config.js';

export class JwtService {
    static async validateToken(token) {
        try {
            const response = await axios.get(`${config.urlGateway}/auth/v1/jwt/validate`, {
                headers: { 'x-token': `${token}` }
            });
            return response.data;
        } catch (error) {
            return null;
        }
    }
}