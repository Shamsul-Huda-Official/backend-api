const authService = require('./auth.service');
const asyncHandler = require('../../shared/utils/asyncHandler');
const { successResponse } = require('../../shared/utils/resonseFormatter')

const createUser = asyncHandler(async(req, res) => {
    const user = await authService.createUser(req.body);
    successResponse(res, user, 'User created successfully');
})

const loginUser = asyncHandler(async(req, res) => {
    const { username, password } = req.body;
    const result = await authService.loginUser(username, password);
    successResponse(res, result, 'User logged in successfully');
})

module.exports = {
    createUser,
    loginUser,
}