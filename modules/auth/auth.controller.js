const authService = require('./auth.service');
const asyncHandler = require('../../shared/utils/asyncHandler');
const { successResponse } = require('../../shared/utils/resonseFormatter')

const createUser = asyncHandler(async(req, res) => {
    const user = await authService.createUser(req.body);
    successResponse(res, 201, user);
})

const loginUser = asyncHandler(async(req, res) => {
    const { username, password } = req.body;
    const result = await authService.loginUser(username, password);
    successResponse(res, 200, result);
})

module.exports = {
    createUser,
    loginUser,
}