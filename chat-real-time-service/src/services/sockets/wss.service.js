import { WebSocketServer } from 'ws';
import { JwtService } from '../jwt/jwt.service.js';
import logger from "../../plugins/winston.adapter.js";
import { ChatWebsockets } from '../../domain/dto/ws.chat.dto.js';

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
            this.clients[userEmail] = ws;

            ws.on('message', (message) => {
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
                console.log(objectDto);
                // Unir al usuario a una sala
                if (type === 'join') {
                    if (!this.rooms[roomId]) {
                        this.rooms[roomId] = [];
                    }
                    this.rooms[roomId].push(userEmail);
                    ws.send(JSON.stringify({ message: `User connected on rooms ${roomId}` }));
                    console.log(`User with token ${userEmail} joined room ${roomId}`);
                } else if (type === 'message' && this.rooms[roomId]) {
                    const [errorMessage, messageDto] = ChatWebsockets.messageRoomDto(objectDto);
                    if(errorMessage) {
                        logger.warn(errorMessage);
                        ws.close(1000, errorMessage);
                        return;
                    }
                    const { content } = messageDto;
                    // Enviar mensaje a todos los usuarios en la sala
                    this.rooms[roomId].forEach((id) => {
                        // !== userEmail Agregar para Enviar mensajes a todos menos al usuario que envió el mensaje
                        if (this.clients[id]) {
                            this.clients[id].send(JSON.stringify({ user: userEmail, content }));
                        }
                    });
                }
            });

            ws.on('close', () => {
                console.log('disconnected');
                // Eliminar al usuario del registro cuando se desconecte
                if (this.clients[userEmail] === ws) {
                    delete this.clients[userEmail];
                    // Eliminar al usuario de todas las salas
                    for (const roomId in this.rooms) {
                        this.rooms[roomId] = this.rooms[roomId].filter(id => id !== userEmail);
                    }
                }
            });
            // Manejo de errores
            ws.on('error', (err) => {
                logger.error(`Error en la conexión WebSocket: ${err.message ?? ''}`);
                ws.close(1000, 'Error en la conexión WebSocket');
            });
            // Enviar un mensaje al cliente después de la conexión
            ws.send('Bienvenido al servidor WebSocket');
        });
    }
    static initWss(options) {
        WssService._instance = new WssService(options);
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
    "type": "join",
    "content": "Hola a todos!",
    "roomId": "room1"
}
*/