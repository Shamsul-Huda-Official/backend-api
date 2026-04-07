const institutionRepository = require('./institution.repository')
const authService = require('../auth/auth.service')

const createInstitution = async (data) => {
    const { name, email, password } = data;

    if(!name || !email || !password) {
        throw new Error('Name, email and password are required.')
    }

    const institution = await institutionRepository.createInstitution({
        name,
        email,
    });

    // create a admin user
    await authService.createUser({
        name: `${name} Admin`,
        username: `email`,
        password,
        role: 'admin',
        institutionId: institution._id,
    })
    return institution;
}

const getAllInstitution = async (skip, limit, name, search, query) => {
    return await institutionRepository.getAllInstitutions({
        skip,
        limit,
        name, 
        search, 
        query,
    })
}

const getInstitutionById = async (id) => {
    return await institutionRepository.getInstitutionById(id)
}

const updateInstitutionById = async (id, data) => {
    return await institutionRepository.updateInstitution(id, data);
}

const deleteInstitution = async (id) => {
    return await institutionRepository.deleteInstitution(id);
}

module.exports = {
    createInstitution,
    getAllInstitution,
    getInstitutionById,
    updateInstitutionById,
    deleteInstitution,
}