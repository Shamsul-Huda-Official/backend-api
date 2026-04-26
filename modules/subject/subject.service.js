const { prisma } = require('../../shared/config/connection');
const AppError = require('../../shared/errors/AppError');

const subjectRepository = require('./subject.repository');

const createSubject = async (data) => {
    const { name, institutionId, classId, divisionId } = data;

    if( !name ) throw new AppError('Subject name is required!', 400)
    if( !institutionId ) throw new AppError('institutionId is required!', 400)
    if( !classId ) throw new AppError('classId is required!', 400)
    if( !divisionId ) throw new AppError('divisionId is required', 400)
        
    return await subjectRepository.createSubject({
        name,
        institutionId,
        classId,
        divisionId
    })
}

const bulkCreateSubjects = async(institutionId, classId, divisionId, names) => {
    if(!institutionId) throw new AppError('institutionId is required', 400)
    if(!classId) throw new AppError('classId is required', 400)
    if(!divisionId) throw new AppError('divisionId is required', 400)
    if(!names || names.length === 0) throw new AppError('No subject provided') 
 
    const docs = names.map(name => ({ name, institutionId, classId, divisionId }));
    return await subjectRepository.bulkCreateSubject(docs)
}

const getAllSubjects = async ({ institutionId, classId, divisionId }) => {
    if( !institutionId ) throw new AppError('institutionId is missing', 400)
    if( !classId ) throw new AppError('classId is missing', 400)
    if( !divisionId ) throw new AppError('divisionId is missing', 400)

    return await subjectRepository.getAllSubjects({
        institutionId,
        classId,
        divisionId
    })
}

const getSubjectById = async (id, institutionId) => {
    const subject = await subjectRepository.getSubjectById(id, institutionId);
    if(!subject) throw new AppError('Subject not found', 404)
    return subject
}

const updateSubject = async (id, institutionId, data) => {
    const subject = await subjectRepository.updateSubject(id, institutionId, data)
    if( !subject ) throw new AppError('Subject not found', 404);
    return subject
}

const deleteSubject = async (id, institutionId) => {
    return await subjectRepository.deleteSubject(id, institutionId);
}

module.exports = {
    createSubject,
    bulkCreateSubjects,
    getAllSubjects,
    getSubjectById,
    updateSubject,
    deleteSubject
}