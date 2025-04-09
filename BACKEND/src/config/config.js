import 'dotenv/config';

const _config = {
    PORT: process.env.PORT,
    MONGODB_URI: process.env.MONGODB_URI,
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_EXPIRES_IN :process.env.JWT_EXPIRES_IN,
    NEWS_API_KEY : process.env.NEWS_API_KEY,
    GEMINI_API_KEY : process.env.GEMINI_API_KEY,
    EMAIL_USER:process.env.EMAIL_USER,
    EMAIL_PASS:process.env.EMAIL_PASS,
    MYEMAIL:process.env.MYEMAIL,
    EMAIL_USER:process.env.EMAIL_USER,
    EMAIL_PASS:process.env.EMAIL_PASS
}

const config = Object.freeze(_config);
export default config;