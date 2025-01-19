import helmet from 'helmet';
export default function setupHelmet(app){
    app.use(helmet());
}