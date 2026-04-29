const teacherService = require('./teacher.service');
const asyncHandler = require('../../shared/utils/asyncHandler');

const { invalidateCache } = require('../../shared/utils/cache');
const { successResponse } = require('../../shared/utils/responseFormatter');

exports.createTeacher = asyncHandler(async (req, res) => {
    const institutionId = req.user.institutionId;
    const teacher = await teacherService.createTeacher({ 
        ...req.body, institutionId
    });
    await invalidateCache('teacher:*')
    return successResponse(res, teacher, 'Teacher created successfully.');
});

exports.bulkCreateTeacher = asyncHandler(async (req, res) => {
    const institutionId = req.user.institutionId;
    const { teachers } = req.body;

    const result = await teacherService.bulkCreateTeacher({
        teachers,
        institutionId
    })
    return successResponse(res, result, 'Bulk create completed.')
})


