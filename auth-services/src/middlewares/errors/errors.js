
import path from "path";
import { fileURLToPath } from 'url';
import { QueryFailedError } from "typeorm";
import { config } from "../../config/config.js";
import logger from "../../plugins/winston.adapter.js";

const __filename = fileURLToPath(import.meta.url); 
const __dirname = path.dirname(__filename);

export const  routeErrors = (req, res, next) =>{
    const ipClient = req.ip || req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    logger.warn(`Route not found ${ipClient??''}`);
    const filePath = path.join(__dirname, `../../../public/security/404.html`);
    return res.status(404).sendFile(filePath);
}
export const logErrors = (err, req, res, next) => {
    if (config.isDev) {
        console.error(err);
    }
    next(err);
}
export const errorHandler =(err, req, res, next) => {
    const ipClient = req.ip || req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    logger.error(`${err?.stack??''} ${ipClient??''}`);
    const status = err.status || `fail`;
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
        const payloadSpanish = err?.details?.map(detail => detail.message).join(`, `);
        if (payloadSpanish) {
            output.payload.message = payloadSpanish;
        }
        res.status(output.statusCode).json(output.payload);
    } else {
        next(err);
    }
}

export const ormErrorHandler = (err, req, res, next) => {
    const ipClient = req.ip || req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    if (err instanceof QueryFailedError) {
        logger.error(`Error ORM: ${err?.message??''} ${ipClient??''}`);
        res.status(409).json({
            statusCode: 409,
            message: err.name,
            detail: err.message
        });
    } else if (err.name === `EntityNotFound`) {
        logger.error(`Error Entity ORM: ${err?.message??''} ${ipClient??''}`);
        res.status(404).json({
            statusCode: 404,
            message: err.message,
            detail: `The requested entity was not found.`
        });
    }
    next(err);
};
