const { prisma } = require('../../shared/config/connection');
const institutionRepository = require('./institution.repository');
const authRepository = require('../auth/auth.repository');

const authService = require('../auth/auth.service');
const AppError = require('../../shared/errors/AppError');

const createInstitution = async (data) => {
    const { name, email, address, adminId, plan, adminName, adminEmail, adminPassword, adminPhone  } = data;

    if( !name || !email || !address || !adminEmail || !plan ) {
        throw new AppError('All fields are required.', 400);
    }

    return await prisma.$transaction(async (tx) => {
        const institution = await institutionRepository.createInstitution(
            { name, email, address, plan },
            tx
        );
        
        if(adminId) {
        const existingUser = await authRepository.findById(adminId);
        if(!existingUser) {
            throw new AppError('Admin not found', 404);
        }

        await tx.auth.update({
            where: { id: adminId },
            data: { institutionId: institution.id, role: 'ADMIN' },
        })

    } else if (adminEmail && adminPassword) {
        await authService.createUser({
            name: adminName || `${name} Admin`,
            username: adminPhone,
            phone: adminPhone,
            email: adminEmail,
            password: adminPassword,
            role: 'ADMIN',
            institutionId: institution.id,
        }, tx);
    } else {
        throw new AppError('Admin details are required to create an institution.', 400);
    }
    return institution;
    });
}

const getAllInstitution = async (skip, limit, name, search, query) => {
    return await institutionRepository.getAllInstitutions({
        skip,
        limit,
        name, 
        search, 
    })
}

const getInstitutionById = async (id) => {
    return await institutionRepository.getInstitutionById(id)
}

const updateInstitutionById = async (id, data) => {
    const { name, email, address, plan, isActive } = data;
    return await institutionRepository.updateInstitution(id, {
        name,
        email,
        address,
        plan,
        isActive
    });
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