const { prisma } = require('../../shared/config/connection');
const AppError = require('../../shared/errors/AppError');

const attendanceRepository = require('./attendance.repository');

const bulkCreateAttendance = async (data) => {
    const { institutionId, classId, divisionId, date, type, periodId, students, markedById } = data;

    if (!classId || !divisionId || !date || !type || !students) throw new AppError('All fields are required.', 400);
    if (!institutionId) throw new AppError('institutionId is required.', 400);

    if(type === 'PERIOD' && !periodId) throw new AppError('periodId is required for period wise attendance', 400);
    
    const docs = students.map(student => ({
        studentId: student.studentId,
        status: student.status || 'PRESENT',
        purpose: student.purpose || null,
        date: new Date(date),
        type, 
        periodId: periodId || null,
        classId,
        divisionId, 
        institutionId,
        markedById
    }));
    return await attendanceRepository.bulkCreateAttendance({ docs })
};

const getAttendance = async ({ institutionId, classId, divisionId, date, type, periodId }) => {
    if (!classId || !divisionId || !date || !type ) throw new AppError('ClassId, divisionId, date and type are required.', 400);
    return await attendanceRepository.getAttendance({
        institutionId,
        classId,
        divisionId,
        date,
        type,
        periodId,        
    });
};

const getAbsentPeriods = async ({ studentId, institutionId }) => {
    if ( !studentId || !institutionId ) throw new AppError('Student ID and institution ID is required.', 400)
    return await attendanceRepository.getAbsentPeriods({ studentId, institutionId });
};

const recoverAttendance = async (id, institutionId, data) => {
    const attendance = await attendanceRepository.recoverAttendance(id, institutionId, data);
    if (!attendance) throw new AppError('Attendance not found.', 404);
    return attendance;
}

const recoverAllAttendance = async ({ studentId, institutionId }) => {
    if (!studentId) throw new AppError('StudentId is required.', 400);
    return await attendanceRepository.recoverAllAttendance({ studentId, institutionId });
}

module.exports = {
    bulkCreateAttendance,
    getAttendance,
    getAbsentPeriods,
    recoverAttendance,
    recoverAllAttendance
}