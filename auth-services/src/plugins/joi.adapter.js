import { BoomAdapter } from './hapi-boom.adapter.js';
import path from "path";
import fs from 'fs';
import { fileURLToPath } from 'url'; // Convertir `import.meta.url` a `__dirname` 
const __filename = fileURLToPath(import.meta.url); 
const __dirname = path.dirname(__filename);
const translations = JSON.parse(fs.readFileSync(path.join(__dirname, '../middlewares/schemas/json/spanish-joi-messages.json'), { encoding: 'utf8' }));

export class JoiAdapter {
    // Método estático para validar un objeto contra un esquema Joi
    static validate(schema, property) {
        return (req, res, next) => {
            const { error } = schema.validate(req[property], { abortEarly: false });
            if (error) {
                error.details?.map(detail => {
                    const translatedMessage = translations[detail.type];
                    if (translatedMessage) {
                        const valueInQuotes = detail.message.match(/"([^"]+)"/)?.[0] || "";
                        const numberMatch = detail.message.match(/\d+/);
                        const number = numberMatch ? numberMatch[0] : "";
                        const finalMessage = number ? translatedMessage.replace('{{limit}}', number) : translatedMessage;
                        // Reemplazar el mensaje manteniendo el valor entre comillas dobles
                        detail.message = `${valueInQuotes} ${finalMessage}`;
                    }
                    return detail;
                });
                next(BoomAdapter.badRequest(error));
            } else {
                next();
            }
        }
    }
}

