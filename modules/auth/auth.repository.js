const { prisma } = require('../../shared/config/connection');

const findByUsername = async (username) => {
    return await prisma.auth.findUnique({ where: { username } });
}

const findById = async (id) => {
    return await prisma.auth.findUnique({ where: { id } });
}

const createUser = async (userData) => {
    return await prisma.auth.create({ data: userData });
}

module.exports = {
    findByUsername,
    findById,
    createUser,
}