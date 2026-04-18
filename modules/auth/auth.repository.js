const User = require('./auth.model');

const findByUsername = async (username) => {
    return await User.findOne({ username });
}

const createUser = async (userData, session) => {
    return await User.create([userData], { session });
}

module.exports = {
    findByUsername,
    createUser,
}