const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authRepository = require('./auth.repository');
const {JWT_SECRET} = require('../../shared/config/env');
const AppError = require('../../shared/errors/AppError')
// const JWT_SECRET = process.env.JWT_SECRET 

const createUser = async (userData, tx = prisma) => {
    const existing = await authRepository.findByUsername(userData.username);
    if(existing) {
        throw new AppError('Username already exists', 400);
    }

    const { password } = userData;

    const hashedPassword = await bcrypt.hash(password, 10);
    const cleanData = { ...userData };

    if(!cleanData.phone) delete cleanData.phone;
    if(!cleanData.email) delete cleanData.email;

    const user = await authRepository.createUser({
        ...cleanData,
        password: hashedPassword,
    }, tx);
    return user;
}

const loginUser = async (username, password) => {
    const user = await authRepository.findByUsername(username);

    if (!user) {
        throw new AppError('User not found', 404);
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new AppError('Invalid credentials', 401);
    }

    const token = jwt.sign(
        {
            id: user.id, 
            role: user.role,
            institutionId: user.institutionId,
        },
        JWT_SECRET, 
        { expiresIn: '1d'}
    )
    return {
        token, 
        user: {
            id: user.id,
            name: user.name,
            role: user.role,   
        },
    };
};

module.exports = {
    createUser,
    loginUser,
}