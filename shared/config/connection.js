require('dotenv').config();

const { PrismaPg } = require('@prisma/adapter-pg');
const { PrismaClient } = require("@prisma/client");
const logger = require("../logger/logger");

const adapter = new PrismaPg(process.env.DATABASE_URL);
const prisma = new PrismaClient({ adapter });

const connectDB = async () => {
    await prisma.$connect()
        .then(() => logger.info('PostgreSQL connected successfully'))
        .catch((err) => logger.error('PostgreSQL connection error: ' + err));
}

module.exports = {
    connectDB,
    prisma,
}