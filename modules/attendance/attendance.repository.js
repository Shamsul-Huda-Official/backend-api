const { prisma } =  require('../../shared/config/connection');

const bulkCreateAttendance = async (docs) => {
    return prisma.attendance.createMany({
        data: docs,
        skipDuplicates: true,
    });
};

const getAttendance = async ({ institutionId, classId, divisionId, date, type, periodId }) => {
    const where = { institutionId, classId, divisionId, date: new Date(date), type };
    return await prisma.attendance.findMany({
        where,
        include: {
            student: {
                select: {
                    id: true, name: true, rollNumber: true,
                },
            }
        },
        orderBy: { student: { rollNumber: 'asc'}}
    })
}

const getAbsentPeriods = async (studentId, institutionId) => {
    return await prisma.attendance.findMany({
        where: {
            studentId,
            institutionId,
            type: 'PERIOD',
            status: { in: ['ABSENT', 'EXCUSED', 'MEDICAL']}
        },
        include: {
            period: {
                include: {
                    subject: { 
                        select: { 
                            name: true
                        }
                    }
                }
            }
        },
        orderBy: {
            date: 'asc',
        }
    })
}

const recoverAttendance = async (id, institutionId, data) => {
    return await prisma.attendance.update({
        where: {
            id, 
            institutionId,
        },
        data
    });
};

const recoverAllAttendance = async ({ studentId, institutionId }) => {
    return await prisma.attendance.updateMany({
        where: {
            studentId,
            institutionId,
            type: 'PERIOD',
            status: { in: ['ABSENT', 'EXCUSED', 'MEDICAL']}
        },
        data: { status: 'RECOVERED'}
    });
};

module.exports = {
    bulkCreateAttendance,
    getAttendance,
    getAbsentPeriods,
    recoverAttendance,
    recoverAllAttendance,
}