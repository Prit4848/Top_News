import 'dotenv/config';

const _config = {
    PORT: process.env.PORT,
    MONGODB_URI: process.env.MONGODB_URI,
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_EXPIRES_IN :process.env.JWT_EXPIRES_IN
}

const config = Object.freeze(_config);
export default config;