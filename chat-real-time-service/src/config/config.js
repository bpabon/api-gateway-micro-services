import { config as dotenvConfig } from 'dotenv';

const env = process.env.NODE_ENV || 'development';

const envs = {
    'development': '.env',
    'production': '.env',
    'test': '.env.test'
};

const options = {};

if (envs[env]) {
    options.path = envs[env];
}

dotenvConfig(options);

export const config = {
    env,
    isProd: process.env.NODE_ENV === 'production',
    isDev: env === 'development',
    dbUser: process.env.POSTGRES_USER,
    dbPassword: process.env.POSTGRES_PASSWORD,
    dbHost: process.env.DATABASE_HOST,
    dbPort: process.env.POSTGRES_PORT,
    dbUrl: process.env.POSTGRES_URL,
    PORT: process.env.PORT || 3002,
    urlGateway: process.env.URL_API_GATEWAY,
};