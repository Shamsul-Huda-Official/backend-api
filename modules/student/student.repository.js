const { prisma } = require('../../shared/config/connection');

const createStudent = async (data, tx = prisma) => {
    return await tx.student.create({ data })
}

const bulkCreateStudent = async (docs) => {
    return await prisma.student.createMany({
        data: docs,
    });
};

const getAllStudents = async ({ institutionId }) => {
    return await prisma.student.findMany({
        where: {
            institutionId,
        }
    });
};

const getStudentById = async (id, institutionId) => {
    return await prisma.student.findUnique({
        where: {
            id, 
            institutionId
        }
    });
};

const updateStudent = async (id, institutionId, data) => {
    return await prisma.student.update({
        where: {
            id, 
            institutionId,
        }, 
        data
    });
};

const deleteStudent = async (id, institutionId) => {
    return await prisma.student.delete({
        where: {
            id, 
            institutionId
        }
    });
};

module.exports = {
    createStudent, 
    bulkCreateStudent,
    getAllStudents,
    getStudentById,
    updateStudent,
    deleteStudent
}