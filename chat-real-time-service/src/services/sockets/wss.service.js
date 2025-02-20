import { WebSocketServer } from 'ws';
import { JwtService } from '../jwt/jwt.service.js';
import logger from "../../plugins/winston.adapter.js";
import { ChatWebsockets } from '../../domain/dto/ws.chat.dto.js';
import { AuthService } from '../auth/auth.service.js';
export class WssService {
    static _instance;
    constructor(options) {
        const { server, path = '/ws' } = options; // ws://localhost:3002/ws
        this.wss = new WebSocketServer({ server, path });
        this.clients = {}; // Registro de usuarios conectados
        this.rooms = {}; // Registro de salas y sus usuarios
        this.start();
    }
    start() {
        const listWhiteTypes = ['join','message'];
        this.wss.on('connection', async (ws, req) => {
            const tokenSend = req.headers['x-token'];
            if (!tokenSend) {
                logger.warn(`Token not found`);
                ws.close(1000, 'Token not found');
                return;
            }
            const { token } = await JwtService.validateToken(tokenSend);
            if (!token) {
                logger.warn(`Token is invalid`);
                ws.close(1000, 'Token is invalid');
                return;
            }
            const userEmail = token.email;
            // Enviar un mensaje al cliente después de la conexión
            await this.updateConnection(tokenSend, true, ws);
            this.clients[userEmail] = ws;

            ws.on('message', async(message) => {
                const [error, objectDto] = ChatWebsockets.joinRoomDto(JSON.parse(message));
                if(error) {
                    logger.warn(error);
                    ws.close(1000, error);
                    return;
                }
                const { type, roomId } = objectDto;
                if(!listWhiteTypes.includes(type)){
                    logger.warn(`Type is not exist in list of white types`);
                    ws.close(1000, 'Type is not exist in list of white types');
                    return;
                }
                // Unir al usuario a una sala
                if (type === 'join') {
                    await this.handleJoinRoom(userEmail, roomId, ws);
                } else if (type === 'message' && this.rooms[roomId]) {
                    await this.handleMessage(userEmail, roomId, objectDto, ws);
                }
            });

            ws.on('close', async () => {
                 await this.updateConnection(tokenSend, false, ws);
                this.handleDisconnect(userEmail, ws);
            });
            // Manejo de errores
            ws.on('error', (err) => {
                logger.error(`Error en la conexión WebSocket: ${err.message ?? ''}`);
                ws.close(1000, 'Error en la conexión WebSocket');
            });

        });
    }
    static initWss(options) {
        WssService._instance = new WssService(options);
    }
    async handleJoinRoom(userEmail, roomId, ws) {
        if (!this.rooms[roomId]) {
            this.rooms[roomId] = [];
        }
        this.rooms[roomId].push(userEmail);
        // await DatabaseService.saveUserJoinRoom(userEmail, roomId);
        ws.send(JSON.stringify({ message: `User connected on rooms ${roomId}` }));
        console.log(`User with token ${userEmail} joined room ${roomId}`);
    }
    async handleMessage(userEmail, roomId, objectDto, ws) {
        const [errorMessage, messageDto] = ChatWebsockets.messageRoomDto(objectDto);
        if (errorMessage) {
            logger.warn(errorMessage);
            ws.close(1000, errorMessage);
            return;
        }
        const { content } = messageDto;
        // await DatabaseService.saveMessage(userEmail, roomId, content);
        this.rooms[roomId].forEach((id) => {
            console.log(id,'+++++++++++++++++++', roomId);
            if (this.clients[id]) {
                this.clients[id].send(JSON.stringify({ user: userEmail, content }));
            }
        });
    }
    async updateConnection(token, connection, ws){
        const update = await AuthService.updateStatusConnection(token,connection);
        if(update){
            ws.send(connection ? 'Bienvenido al servidor WebSocket' : 'User disconnected');
        }
    }
    handleDisconnect(userEmail, ws) {
        console.log('disconnected');
        if (this.clients[userEmail] === ws) {
            delete this.clients[userEmail];
            for (const roomId in this.rooms) {
                this.rooms[roomId] = this.rooms[roomId].filter(id => id !== userEmail);
            }
        }
    }
}
/*
1. Unirme a una sala 
{
    "type": "join",
    "roomId": "room1"
}
2. Enviar mensaje a una sala 
{
    "type": "message",
    "content": "Hola a todos!",
    "roomId": "room1"
}
*/