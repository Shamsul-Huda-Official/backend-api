const redisClient = require('./redisClient');

const invalidateCache = async (pattern) => {
    try {
        const keys = await redisClient.keys(pattern);
        if (keys.length > 0) {
            await redisClient.del(keys);
        }
    } catch (error) {
        console.error('Error invalidating cache:', error);
    }
};

module.exports = {
    invalidateCache,
};