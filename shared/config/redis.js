const { createClient } = require('redis');
const { REDIS_URI } = require('./env');
const logger = require('../logger/logger');

const redisClient = createClient({
    url: REDIS_URI,
});

(async () => {
    try {
        await redisClient.connect();
        logger.info('Redis connected successfully');
    } catch (error) {
        logger.error('Error connecting to Redis:', error);
    }
})();

redisClient.on('error', (err) => {
    logger.error('Redis Client Error', err);
})

module.exports = redisClient;
