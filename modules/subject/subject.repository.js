const { prisma } = require('../../shared/config/connection')

const createSubject = async (data, tx = prisma) => {
    return await tx.subject.create({ data })
}

const bulkCreateSubject = async (docs, tx = prisma) => {
    return await tx.subject.createMany({
        data: docs,
        skipDuplicates: true,
    })
}

const getAllSubjects = async ({ institutionId, classId, divisionId }) => {
    return await prisma.subject.findMany({
        where: {
            institutionId: institutionId,
            classId: classId,
            divisionId: divisionId,
            // this find records WHERE these condition matches
        },
        orderBy: { name: 'asc'}
    })
}

const getSubjectById = async (id) => {
    return await prisma.subject.findUnique({ where: {
        id,
        institutionId
    } })
}

const updateSubject = async (id, institutionId, data) => {
    return await prisma.subject.update({ where: {
        id,
        institutionId
    }, 
    data 
 })
}

const deleteSubject = async (id, institutionId) => {
    await prisma.subject.delete({ where: {
        id, 
        institutionId
    }})
}

module.exports = {
    createSubject,
    bulkCreateSubject,
    getAllSubjects,
    getSubjectById,
    updateSubject,
    deleteSubject
}