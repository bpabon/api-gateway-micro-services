import { config as dotenvConfig } from 'dotenv';

const env = process.env.NODE_ENV || 'development';

const envs = {
    'development': '.env',
    'production': '.env'
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
    PORT: process.env.PORT || 3000,
    SERVICE_AUTH: process.env.SERVICE_AUTH || "http://localhost:3001",
    SERVICE_CHAT: process.env.SERVICE_CHAT || "http://localhost:3002"
};
