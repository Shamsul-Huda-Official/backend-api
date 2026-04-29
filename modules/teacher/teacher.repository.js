const { prisma } = require('../../shared/config/connection');

const createTeacher = async (data) => {
    return await prisma.teacher.create({ data })
}

const bulkCreateTecher = async (data, )