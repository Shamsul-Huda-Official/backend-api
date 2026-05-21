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
});

exports.getAllTeachers = asyncHandler(async (req, res) => {
    const institutionId = req.user.institutionId;

    const teachers = await teacherService.getAllTeachers({
        institutionId
    });
    return successResponse(res, teachers, 'Teachers fetched successfully.');
});

exports.getTeacherById = asyncHandler(async (req, res) => {
    const institutionId = req.user.institutionId;

    const teacher = await teacherService.getTeacherById( req.params.id, institutionId );
    return successResponse(res, teacher, 'Teacher by Id fetched successfully.');
});

exports.updateTeacher = asyncHandler(async (req, res) => {
    const institutionId = req.user.institutionId;

    const teacher = await teacherService.updateTeacher( req.params.id, institutionId, req.body );
    await invalidateCache('teacher:*')
    return successResponse(res, teacher, 'Teacher updated successfully.');
});

exports.deleteTeacher = asyncHandler(async (req, res) => {
    const institutionId = req.user.institutionId;

    const teacher = await teacherService.deleteTeacher(req.params.id, institutionId);
    await invalidateCache('teacher:*');
    return successResponse(res, null, 'Teacher deleted successfully.');
})