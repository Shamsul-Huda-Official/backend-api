const { prisma } = require('../../shared/config/connection');
const asyncHandler = require('../../shared/utils/asyncHandler');
const { successResponse } = require('../../shared/utils/responseFormatter');
const { invalidateCache } = require('../../shared/utils/cache');

const attendanceService = require('./attendance.service')

exports.markAttendance = asyncHandler(async (req, res) => {
    const institutionId = req.user.institutionId;
    const markedById = req.user.id;
    const result = await attendanceService.bulkCreateAttendance({
        ...req.body,
        institutionId,
        markedById
    });
    return successResponse(res, result, 'Attendance marked successfully.');
});

exports.getAttendance = asyncHandler(async (req, res) => {
    const institutionId = req.user.institutionId;
    const { classId, divisionId, date, type, periodId } = req.query;
    const attendance = await attendanceService.getAttendance({
        institutionId, classId, divisionId, date, type, periodId
    });
    return successResponse(res, attendance, 'Attendance of the specific class fetched successfully.');
});

exports.getAbsentPeriods = asyncHandler(async (req, res) => {
    const institutionId = req.user.institutionId;
    const {studentId} = req.params;
    const result = await attendanceService.getAbsentPeriods({
        studentId,
        institutionId
    });
    return successResponse(res, result, 'Absent periods fetched successfully.')
})

exports.recoverAttendance = asyncHandler(async (req, res) => {
    const institutionId = req.user.institutionId;
    const result = await attendanceService.recoverAttendance(
        req.params.id,
        institutionId,
        req.body
    );
    return successResponse(res, result, 'Attendance recovered successfully.');
});

exports.recoverAllAttendance = asyncHandler(async (req, res) => {
    const institutionId = req.user.institutionId;
    const { studentId } = req.params;
    const result = await attendanceService.recoverAllAttendance({ studentId, institutionId });
    return successResponse(res, result, 'All attendance recovered')
})