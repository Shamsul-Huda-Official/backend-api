const { prisma } = require('../../shared/config/connection');
const AppError = require('../../shared/errors/AppError');

const periodRepository = require('./period.repository');
const dayMap = {
    'Sunday': 0,
    'Monday': 1,
    'Tuesday': 2,
    'Wednesday': 3,
    'Thursday': 4,
    'Friday': 5,
    'Saturday': 6,
}
const createPeriods = async (data) => {
    const { count, length, dayOfWeek, institutionId, classId, divisionId } = data;
    if ( !count || !length || !dayOfWeek ) throw new AppError('All fields are required.', 400)
    if( !institutionId ) throw new AppError('institutionId is required!', 400)
    if( !classId ) throw new AppError('classId is required!', 400)
    if( !divisionId ) throw new AppError('divisionId is required', 400)

    const dayNumber = dayMap[dayOfWeek];
    if (dayNumber === undefined) throw new AppError('Invalid day. Use Monday to Sunday', 400)

    const periods = [];
    for (let i = 1; i <= count; i++) {
        periods.push({
            name: `${i}`,
            length,
            dayOfWeek: dayNumber,
            institutionId,
            classId,
            divisionId,
        });
    }

    return await periodRepository.createPeriods(periods);
}

const assignSubject = async (id, institutionId, data) => {
    const { subjectId, teacherId } = data;
    if(!subjectId) throw new AppError('Subject id is required', 400)

    const period = periodRepository.assignSubject(id, institutionId, data);
    if (!period) throw new AppError('Period not found', 404);
    return period;
}

const getAllPeriods = async ({ institutionId, classId, divisionId }) => {
    if( !institutionId ) throw new AppError('institutionId is required!', 400)
    if( !classId ) throw new AppError('classId is required!', 400)
    if( !divisionId ) throw new AppError('divisionId is required', 400)

    return await periodRepository.getAllPeriods({
        institutionId,
        classId,
        divisionId,
    })
}

const getPeriodById = async (id, institutionId) => {
    if(!institutionId) throw new AppError('institutionId is required.', 400);

    const period = await periodRepository.getPeriodById(id, institutionId);
    if(!period) throw new AppError('Period not found.', 404);
    return period;
}

const deletePeriod = async (id, institutionId) => {
    return await periodRepository.deletePeriod(id, institutionId);
}

module.exports = {
    createPeriods, 
    assignSubject,
    getAllPeriods,
    getPeriodById,
    deletePeriod,
};