const { prisma } = require('../../shared/config/connection');
const AppError = require('../../shared/errors/AppError');

const authService =require('../auth/auth.service');
const teacherRepository = require('./teacher.repository');

const createTeacher = async (data) => {
    const { name, phone, email, profileImageUrl, profileImagePublicId, password, institutionId } = data;

    if ( !name || !phone || !email || !password) {
        throw new AppError('All fields are required.', 400)
    }
    // if ( !profileImagePublicId || !profileImageUrl ) {
    //     throw new AppError('Profile image is required.', 400)
    // } not needed now
    if (!institutionId) {
        throw new AppError('InstitutionId is required', 400)
    }

    return await prisma.$transaction(async (tx) => {
        const auth = await authService.createUser({
            name,
            username: phone,
            phone,
            email,
            password,
            role: 'TEACHER',
            institutionId
        }, tx)

        return await teacherRepository.createTeacher({
            name,
            phone,
            email,
            institutionId,
            userId: auth.id,
        }, tx);
    });
};

const bulkCreateTeacher = async ({ teachers, institutionId}) => {
    return await prisma.$transaction(async (tx) => {
        const results = [];
        
        for (const teacher of teachers) {
            const auth = await authService.createUser({
                name: teacher.name,
                username: teacher.phone,
                phone: teacher.phone,
                email: teacher.email,
                password: teacher.password,
                role: 'TEACHER',
                institutionId,
            }, tx);

            const newTeacher = await teacherRepository.createTeacher({
                name: teacher.name,
                phone: teacher.phone,
                email: teacher.email,
                institutionId,
                userId: auth.id,
            }, tx);
            results.push(newTeacher);
        }
        return results;
    });
};