const User = require('./auth.model');

const findByUsername = async (username) => {
    return await User.findOne({ username });
}

const createUser = async (userData) => {
    return await User.create(userData);
}

module.exports = {
    findByUsername,
    createUser,
}