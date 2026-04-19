const classRepository = require('./class.repository');

const createClass = async (data) => {
    const { name, divisions, institutionId } = data;

    if ( !name || !institutionId ) {
        throw new Error('Name and Institution ID are required.');
    }

    if (!divisions || divisions.length === 0) {
        throw new Error('At least one division is required.');
    }

    const names = divisions.map(d => d.name);
    if (new Set(names).size !== names.length) {
        throw new Error('Duplicate division name are not allowed.');
    }

    return await classRepository.createClass(data);
}

const getAllClasses = async ({ skip, limit, institutionId }) => {
   const query = {};

   if(institutionId) {
    query.institutionId = institutionId;
   }
   return await classRepository.getAllClasses(query, skip, limit);
}

const getClassById = async (id) => {
    return await classRepository.getClassById(id);
}

const updateClass = async (id, data) => {
    return await classRepository.updateClass(id, data);
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