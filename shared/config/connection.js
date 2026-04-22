const { PrismaClient } = require("@prisma/client");
const logger = require("../logger/logger");

const prisma = new PrismaClient();

const connectDB = async () => {
    await prisma.$connect()
        .then(() => logger.info('PostgreSQL connected successfully'))
        .catch((err) => logger.error('PostgreSQL connection error: ' + err));
}

module.exports = {
    connectDB,
    prisma,
}