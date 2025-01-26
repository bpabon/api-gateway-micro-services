import helmet from 'helmet';
export default function helmetAdapter(app){
    app.use(helmet());
}