const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authRepository = require('./auth.repository');
const jwt_secret = require('../../shared/config/env').JWT_SECRET;

const createUser = async (userData) => {
    const { password } = userData;

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await authRepository.createUser({
        ...userData,
        password: hashedPassword,
    })
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
        jwt_secret, 
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