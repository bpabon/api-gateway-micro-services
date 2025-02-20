import axios from 'axios';
import { config } from '../../config/config.js';

export class AuthService {
    static async updateStatusConnection(token,statusConnection) {
        try {
            const response = await axios.put(`${config.urlGateway}/auth/v1/user/updateConnection`,{connection: statusConnection}, {
                headers: { 'x-token': `${token}` },
            });
            return response.data;
        } catch (error) {
            return null;
        }
    }
}