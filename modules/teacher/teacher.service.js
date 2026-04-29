const { prisma } = require('../../shared/config/connection');
const AppError = require('../../shared/errors/AppError');

const createTeacher = async (data) => {
    const { name, phone, email, profileImageUrl, profileImagePublicId, institutionId } = data;
}