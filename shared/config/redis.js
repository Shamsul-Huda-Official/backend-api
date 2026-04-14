const { createClient } = require('redis');
const { REDIS_URI } = require('./env');
const logger = require('../utils/logger');

const redisClient = createClient({
    url: REDIS_URI,
});

redisClient.connect("connect", () => {
    logger.info('connected to Redis');
})

redisClient.on('error', (err) => {
    logger.error('Redis Client Error', err);
});

module.exports = redisClient;
