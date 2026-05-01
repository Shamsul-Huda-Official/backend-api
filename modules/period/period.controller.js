const { prisma } = require('../../shared/config/connection');
const asyncHandler = require('../../shared/utils/asyncHandler');
const { successResponse } = require('../../shared/utils/responseFormatter');
const { invalidateCache } = require('../../shared/utils/cache');

const periodService = require('./period.service');

exports.createPeriod = asyncHandler(async (req, res) => {
    const institutionId = req.user.institutionId;
    const period = await periodService.createPeriods( ...req.body, institutionId );
    await invalidateCache('period:*');
    successResponse(res, period, 'Period created successfully.');
})

exports.assignSubject = asyncHandler(async (req, res) => {
    const institutionId = req.user.institutionId;
    const period = await periodService.assignSubject(req.params.id, institutionId, req.body);
    successResponse(res, period, 'Subject assigned successfully.');
})

exports.getAllPeriods = asyncHandler(async (req, res) => {
    const institutionId = req.user.institutionId;
    const { classId, divisionId } = req.query;
    const period = await periodService.getAllPeriods({
        institutionId,
        classId,
        divisionId,
    })

    successResponse(res, period, 'Period fetched successfully.')
})

exports.getPeriodById = asyncHandler(async (req, res) => {
    const institutionId = req.user.institutionId;
    const period = await periodService.getPeriodById(req.params.id, institutionId);
    successResponse(res, period, 'Period by ID fetched successfully.');
})

exports.deletePeriod = asyncHandler(async (req, res) => {
    const institutionId = req.user.institutionId;
    const period = await periodService.deletePeriod(req.params.id, institutionId);
    successResponse(res, null, 'Period by ID fetched successfully');
})