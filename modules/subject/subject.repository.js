const { prisma } = require('../../shared/config/connection')

const createSubject = async (data, tx = prisma) => {
    return await tx.subject.create({ data })
}

const createAllSubjects = async ({ institutionId, classId, divisionId }) => {
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