import cors from 'cors';

export default function corsAdapter(app) {
    const whitelist = ['http://localhost:4200', 'http://localhost:5000'];
    const corsOptions = {
        origin: (origin, callback) => {
            if (!origin || whitelist.includes(origin)) {
                callback(null, true);
            } else { callback(new Error('URL No permitida')); }
        }
    };
    app.use(cors(corsOptions));
}