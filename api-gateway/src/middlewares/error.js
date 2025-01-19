
import path from "path";
import { fileURLToPath } from 'url'; // Convertir `import.meta.url` a `__dirname` 
const __filename = fileURLToPath(import.meta.url); 
const __dirname = path.dirname(__filename);

export const  routeErrors = (req, res, next) =>{
    const filePath = path.join(__dirname, '../../public/segurity/404.html');
    return res.status(404).sendFile(filePath);
}
export const logErrors = (err, req, res, next) => {
    if (config.isDev) {
        console.error(err);
    }
    next(err);
}
export const errorHandler =(err, req, res, next) => {
    const status = err.status || 'fail';
    res.status(500).json({
        status,
        error: err,
        msg: err.message,
        stack: err.stack
    });
}
export const  boomErrorHandler = (err, req, res, next) =>{
    if (err.isBoom) {
        const { output } = err;
        const payloadSpanish = err?.details?.map(detail => detail.message).join(', ');
        if (payloadSpanish) {
            output.payload.message = payloadSpanish;
        }
        res.status(output.statusCode).json(output.payload);
    } else {
        next(err);
    }
}
export const ormErrorHandler = (err, req, res, next) => {
    if (err instanceof ValidationError) {
        res.status(409).json({
            statusCode: 409,
            message: err.name,
            errors: err.errors
        });
    }
    next(err);
}