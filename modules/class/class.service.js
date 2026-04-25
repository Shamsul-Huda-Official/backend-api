const classRepository = require('./class.repository');
const AppError = require('../../shared/errors/AppError')
const { prisma } = require('../../shared/config/connection');

const createClass = async (data) => {
    const { name, divisions, institutionId } = data;

    if ( !name || !institutionId ) {
        throw new AppError('Name and Institution ID are required.', 400);
    }

    if (!divisions || divisions.length === 0) {
        throw new AppError('At least one division is required.', 400);
    }

    const names = divisions.map(d => d.name);
    if (new Set(names).size !== names.length) {
        throw new AppError('Duplicate division name are not allowed.', 400);
    }

    return await prisma.$transaction(async (tx) => {
        const newClass = await classRepository.createClass({ name, institutionId }, tx);

        await tx.division.createMany({
            data: divisions.map(d => ({
                name: d.name,
                classId: newClass.id,
                institutionId,
                classTeacherId: d.classTeacherId || null,
            }))
        });
        return newClass;
    })
}

const getAllClasses = async ({ skip, limit, institutionId }) => {
   const where = {};

   if(institutionId) {
    where.institutionId = institutionId;
   }
   return await classRepository.getAllClasses({ where, skip, limit });
}

const getClassById = async (id) => {
    const data = await classRepository.getClassById(id);
    if (!data) throw new AppError('Class not found', 404);
    return data;
}

const updateClass = async (id, data) => {
    const { name, institutionId, division } = data;

    return await prisma.$transaction(async (tx) => {
        const updateClass = await classRepository.updateClass(id, { name: institutionId }, tx);
        if( division && division.length > 0 ) {
            const names = division.map(d => d.name);
            if(new Set(names).size !== names.length) {
                throw new AppError('Duplicate division names are not allowed.', 400);
            }

            await tx.division.deleteMany({ where: { classId: id }});

            await tx.division.createMany({
                data: division.map(d => ({
                    name: d.name,
                    classId: id,
                    institutionId: updateClass.institutionId,
                    classTeacherId: d.classTeacherId || null
                }))
            });
        }
        return updateClass;
    })
}

const deleteClass = async (id) => {
    return await classRepository.deleteClass(id);
}

module.exports = {
    createClass,
    getAllClasses,
    getClassById,
    updateClass,
    deleteClass,
}