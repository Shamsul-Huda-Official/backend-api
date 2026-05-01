const { prisma } = require('../../shared/config/connection');
const AppError = require('../../shared/errors/AppError');

const periodRepository = require('./period.repository');

const createPeriods = async (data) => {
    const { name, length, dayOfWeek, institutionId, classId, divisionId } = data;
    if ( !name || !length || !dayOfWeek ) throw new AppError('All fields are required.', 400)
    if( !institutionId ) throw new AppError('institutionId is required!', 400)
    if( !classId ) throw new AppError('classId is required!', 400)
    if( !divisionId ) throw new AppError('divisionId is required', 400)

    return await periodRepository.createPeriods({
        name,
        length,
        dayOfWeek,
        institutionId,
        classId,
        divisionId,
    })
}

const assignSubject = async (id, institutionId, data) => {
    const { subjectId } = data;
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