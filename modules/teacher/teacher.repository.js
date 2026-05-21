const { prisma } = require('../../shared/config/connection');

const createTeacher = async (data, tx = prisma) => {
    const client = tx || prisma;
    return await client.teacher.create({ data })
}

const bulkCreateTeacher = async (docs, tx = prisma) => {
    return await tx.teacher.createMany({
        data: docs,
    })
}

const getAllTeachers = async ({ institutionId }) => {
    return await prisma.teacher.findMany({
        where: {
            institutionId
        }
    })
}

const getTeacherById = async (id, institutionId) => {
    return await prisma.teacher.findUnique({
        where: {
            id,
            institutionId
        }
    })
}

const updateTeacher = async (id, institutionId, data) => {
    return await prisma.teacher.update({
        where: {
            id, 
            institutionId
        },
        data
    })
}

const deleteTeacher = async (id, institutionId) => {
    await prisma.teacher.delete({
        where: {
            id,
            institutionId
        }
    })
}

module.exports = {
    createTeacher,
    bulkCreateTeacher,
    getAllTeachers,
    getTeacherById,
    updateTeacher,
    deleteTeacher
}