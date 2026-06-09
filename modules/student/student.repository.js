const { prisma } = require('../../shared/config/connection');

const createStudent = async (data, tx = prisma) => {
    return await tx.student.create({ data })
}

const findDuplicateStudent = async ({ institutionId, email, phone, admissionNumber }) => {
    return await prisma.student.findFirst({
        where: {
            institutionId,
            OR: [
                { phone },
                { email },
                { admissionNumber }
            ]
        }
    })
}

const findRollNumber = async ({ institutionId, divisionId, rollNumber }) => {
    return await prisma.student.findFirst({
        where: {
            institutionId,
            divisionId,
            rollNumber
        }
    })
}

const bulkCreateStudent = async (docs, tx = prisma) => {
    console.log("DOCS:", JSON.stringify(docs, null, 2))
    return await tx.student.createMany({
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

const deleteStudent = async (id, institutionId, tx = prisma) => {
    const student = await tx.student.findFirst({
        where: {
            id,
            institutionId,
        },
        select: {
            id: true, 
            userId: true,
        }
    })
    if(!student) {
        throw new Error('Student not found');
    }
    await tx.student.delete({
        where: {
            id: student.id,
        }
    });

    if (student.userId) {
        await tx.auth.delete({
            where: {
                id: student.userId,
            }
        })
    }
    return student;
};  

module.exports = {
    createStudent, 
    findDuplicateStudent,
    findRollNumber,
    bulkCreateStudent,
    getAllStudents,
    getStudentById,
    updateStudent,
    deleteStudent
}