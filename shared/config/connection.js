const mongoose = require('mongoose');
const { MONGO_URI } = require('./env');
const logger = require('../logger/logger')

const connectDB = async () => {
    await mongoose.connect(MONGO_URI, {
        dbName: 'shia_portal',
    })
    .then(() => logger.info('MongoDB connected successfully'))
    .catch((err) => logger.error('MongoDB connection error:', err));
}

module.exports = connectDB;