
import { config } from "../config/config.js";
export const ROUTES = [
    {
        url: '/auth/',
        auth: false,
        creditCheck: false,
        rateLimit: {
            windowMs: 15 * 60 * 1000, // 15 minutes
            max: 100, // Límite de 100 solicitudes por IP
            message: 'Demasiadas solicitudes, por favor inténtelo de nuevo más tarde.'
        },
        proxy: {
            target: config.SERVICE_AUTH,
            changeOrigin: true,
            pathRewrite: {
                [`^/auth/`]: '',
            },
        }
    },
    {
        url: '/chat',
        auth: true,
        creditCheck: true,
        rateLimit: {
            windowMs: 15 * 60 * 1000, // 15 minutes
            max: 100, // Límite de 100 solicitudes por IP
            message: 'Demasiadas solicitudes, por favor inténtelo de nuevo más tarde.'
        },
        proxy: {
            target: config.SERVICE_CHAT,
            changeOrigin: true,
            pathRewrite: {
                [`^/chat`]: '',
            },
        }
    }
]