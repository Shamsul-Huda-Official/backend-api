require('dotenv').config();

module.exports = {
    MONGO_URI: process.env.MONGO_URI,
    JWT_SECRET: process.env.JWT_SECRET,
    PORT: process.env.PORT,
    REDIS_URI: process.env.REDIS_URI,
    DATABASE_URL: process.env.DATABASE_URL,
}