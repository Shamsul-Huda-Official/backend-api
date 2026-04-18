const mongoose = require('mongoose')

const institutionRepository = require('./institution.repository')
const authRepository = require('../auth/auth.repository')

const authService = require('../auth/auth.service')

const createInstitution = async (data) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    const { name, email, address, adminId, plan, adminName, adminEmail, adminPassword, adminPhone  } = data;

    if( !name || !email || !address || !adminEmail || !plan ) {
        throw new Error('All fields are required.')
    }

    const institution = await institutionRepository.createInstitution({
        name, 
        email, 
        address,
        plan
    }, session);

    if(adminId) {
        const existingUser = await authRepository.findById(adminId);
        if(!existingUser) {
            throw new Error('Admin not found');
        } 

        existingUser.institutionId = institution._id;
        existingUser.role = 'admin';

        await existingUser.save();
    } else if (adminEmail && adminPassword) {
        await authService.createUser({
            name: adminName || `${name} Admin`,
            username: adminPhone,
            phone: adminPhone,
            email: adminEmail,
            password: adminPassword,
            role: 'admin',
            institutionId: institution._id,
        }, session);
    } else {
        throw new Error('Admin details are required to create an institution.')
    }

    await session.commitTransaction();
    session.endSession();

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