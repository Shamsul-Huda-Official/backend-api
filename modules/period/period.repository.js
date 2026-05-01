const { prisma } = require('../../shared/config/connection');

const createPeriods = async (data) => {
    return await prisma.period.create({ data });
}

const assignSubject = async (id, institutionId, data) => {
    return await prisma.period.update({
        where: {
            id, 
            institution,
        },
        data: {
            subjectId: data.subjectId,
        }
    })
}

const getAllPeriods = async ({ institutionId, classId, divisionId }) => {
    return await prisma.period.findMany({
        where: {
            institutionId,
            classId,
            divisionId,
        }
    });
};

const getPeriodById = async (id, institutionId) => {
    return await prisma.period.findUnique({
        where: {
            id,
            institutionId
        }
    });
};

const deletePeriod = async (id, institutionId) => {
    return await prisma.period.delete({
        where: {
            id,
            institutionId
        }
    })
}

module.exports = { 
    createPeriods,
    assignSubject,
    getAllPeriods,
    getPeriodById,
    deletePeriod
}