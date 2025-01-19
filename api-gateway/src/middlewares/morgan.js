import morgan from "morgan";
import fs from 'fs';
export default function setupMorganAdapter(app){
    const accessLogStream = fs.createWriteStream('./src/logs/access.log', { flags: 'a' });
    app.use(morgan('combined', { stream: accessLogStream }));
}