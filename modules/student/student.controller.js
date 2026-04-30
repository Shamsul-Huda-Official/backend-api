const studentService = require('./student.service')
const asyncHandler = require('../../shared/utils/asyncHandler');
const { successResponse } = require("../../shared/utils/responseFormatter");
const { invalidateCache } = require('../../shared/utils/cache');

exports.createStudent = asyncHandler(async (req, res) => {
    const institutionId = req.user.institutionId;
    const student = await studentService.createStudent({ ...req.body, institutionId });
    await invalidateCache('student:*');
    return successResponse(res, student, 'Student created successfully.');
});

exports.bulkCreateStudent = asyncHandler(async (req, res) => {
    const institutionId = req.user.institutionId;
    const { classId, divisionId, students } = req.body;

    const student = await studentService.bulkCreateStudents({
        students,
        institutionId,
        classId,
        divisionId
    });
    return successResponse(res, student, 'bulk students added successfully.')
});

exports.getAllStudents = asyncHandler(async (req, res) => {
    const institutionId = req.user.institutionId;
    const { classId, divisionId } = req.query;

    const students = await studentService.getAllStudents({
        institutionId,
        classId,
        divisionId
    });
    return successResponse(res, students, 'Students fetched successfully');
});

exports.getStudentById = asyncHandler(async (req, res) => {
    const institutionId = req.user.institutionId;
    const student = await studentService.getStudentById(req.params.id, institutionId);
    return successResponse(res, student, 'Student by Id fetched successfully.')
})

exports.updateStudent = asyncHandler(async (req, res) => {
    const institutionId = req.user.institutionId;
    const student = await studentService.updateStudent(req.params.id, institutionId, req.body);
    await invalidateCache('student:*');
    return successResponse(res, student, 'Student updates successfully.')
})

exports.deleteStudent = asyncHandler(async (req, res) => {
    const institutionId = req.user.institutionId;
    const student = (await studentService.deleteStudent(req.params.id, institutionId));
    await invalidateCache('student:*');
    return successResponse(res, student, 'Student deleted successfully.')
})