const { prisma } = require('../../shared/config/connection');

const findByUsername = async (username) => {
    return await prisma.auth.findUnique({ username });
}

const createUser = async (userData, session) => {
    return await prisma.auth.create({ data: userData });
}

module.exports = {
    findByUsername,
    createUser,
}