const Institution = require('./institution.model')
const { prisma } = require('../../shared/config/connection');

const createInstitution = async (data, tx = prisma) => {
    return await tx.institution.create({ data });
}

const getAllInstitutions = async ({ skip = 0, limit = 10, name, search }) => {
    const where = {};
    if (name) where.name = name;
    if (search) where.name = { contains: search, mode: 'insensitive' };
    const [ institution, total ] = await Promise.all([
        prisma.institution.findMany({
            where, skip, take: limit, orderBy: { createdAt: 'desc'}
        }),
        prisma.institution.count({ where })
    ]);
    return { institution, total };
}

const getInstitutionById = async (id) => {
    return await prisma.institution.findUnique({ where: { id }});
}

const updateInstitution = async (id, data) => {
    return await prisma.institution.update({ where: { id}, data });
}

const deleteInstitution = async (id) => {
    return await prisma.institution.delete({ where: { id }});
}

module.exports = {
    createInstitution,
    getAllInstitutions,
    getInstitutionById,
    updateInstitution,
    deleteInstitution,
}