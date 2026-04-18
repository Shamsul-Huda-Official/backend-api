const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authRepository = require('./auth.repository');
const {JWT_SECRET} = require('../../shared/config/env');
// const JWT_SECRET = process.env.JWT_SECRET 

const createUser = async (userData, session = null) => {
    const existing = await authRepository.findByUsername(userData.username);
    if(existing) {
        throw new Error('Username already exists');
    }

    const { password } = userData;

    const hashedPassword = await bcrypt.hash(password, 10);
    const cleanData = { ...userData };

    if(!cleanData.phone) delete cleanData.phone;
    if(!cleanData.email) delete cleanData.email;

    const user = await authRepository.createUser({
        ...cleanData,
        password: hashedPassword,
    }, session);
    return user;
}

const loginUser = async (username, password) => {
    const user = await authRepository.findByUsername(username);

    if (!user) {
        throw new Error('User not found');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new Error('Invalid credentials');
    }

    const token = jwt.sign(
        {
            id: user._id, 
            role: user.role,
            institutionId: user.institutionId,
        },
        JWT_SECRET, 
        { expiresIn: '1d'}
    )
    return {
        token, 
        user: {
            id: user._id,
            name: user.name,
            role: user.role,   
        },
    };
};

module.exports = {
    createUser,
    loginUser,
}