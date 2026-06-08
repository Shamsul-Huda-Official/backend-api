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
    return await prisma.teacher.findFirst({
        where: {
            id,
            institutionId
        },
        include: {
            user: true
        }
    })
}

const updateTeacher = async (id, institutionId, data) => {
    return await prisma.teacher.updateMany({
        where: {
            id, 
            institutionId
        },
        data
    })
}

const deleteTeacher = async (id, institutionId, tx = prisma) => {
    const teacher = await tx.teacher.findFirst({
        where: {
            id, 
            institutionId
        },
        select: {
            id: true,
            userId: true,
        }
    })
    if(!teacher) {
        throw new Error('Teacher not found');
    }
    await tx.teacher.delete({
        where: {
            id: teacher.id
        },
    });
    if (teacher.userId) {
        await tx.auth.delete({
            where: {
                id: teacher.userId,
            }
        })
    }
    return teacher;
}

module.exports = {
    createTeacher,
    bulkCreateTeacher,
    getAllTeachers,
    getTeacherById,
    updateTeacher,
    deleteTeacher
}