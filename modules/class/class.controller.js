const classService = require('./class.service');
const asyncHandler = require('../../shared/utils/asyncHandler');
const { invalidateCache } = require('../../shared/utils/cache');
const { successResponse } = require('../../shared/utils/responseFormatter');

exports.createClass = asyncHandler(async (req, res) => {
    const data = await classService.createClass(req.body);
    await invalidateCache('classes:*');
    return successResponse(res, data, "Class created successfully");
});

exports.getAllClasses = asyncHandler(async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const institutionId = req.query.institutionId;

    const { classes, total } = await classService.getAllClasses({
        skip,
        limit,
        institutionId,
    })
    const pagination = {
        page, 
        limit,
        totalItems: total,
        totalPages: Math.ceil(total / limit),
    }

    return successResponse(res, classes, 'Classes fetched successfully', pagination);
})

exports.getClassById = asyncHandler(async (req, res) => {
    const data = await classService.getClassById(req.params.id);
    return successResponse(res, data, "Class fetched successfully");
})

exports.updateClass = asyncHandler(async (req, res) => {
    const data = await classService.updateClass(req.params.id, req.body);
    await invalidateCache('classes:*');
    return successResponse(res, data, "Class updated successfully");
})

exports.deleteClass = asyncHandler(async (req, res) => {
    await classService.deleteClass(req.params.id);
    await invalidateCache('classes:*');
    return successResponse(res, null, "Class deleted successfully");
})