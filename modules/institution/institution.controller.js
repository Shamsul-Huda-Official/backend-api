const institutionService = require('./institution.service')
const asyncHandler = require('../../shared/utils/asyncHandler');
const { invalidateCache } = require('../../shared/utils/cache');
const { successResponse } = require('../../shared/utils/responseFormatter');

exports.createInstitution = asyncHandler(async (req, res) => {
    const institution = await institutionService.createInstitution(req.body);
    await invalidateCache('institutions:*');
    return successResponse(res, institution, "Institution created successfully");
})

exports.getInstitutions = asyncHandler(async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const { name, search } = req.query;

    const skip = (page - 1) * limit;

    const { institutions, total } = await institutionService.getAllInstitution({ 
        skip, 
        limit,
        name, 
        search
    });

    const pagination = {
        page, 
        limit,
        totalItems: total, 
        totalPages: Math.ceil(total / limit),
    };

    return successResponse(
        res, 
        institutions,
        "Institutions fetched successfully",
        pagination
    )
})

exports.getInstitutionById = asyncHandler(async (req, res) => {
    const institution = await institutionService.getInstitutionById(req.params.id);
    return successResponse(res, institution, "Institution fetched successfully");
})

exports.updateInstitution = asyncHandler(async (req, res) => {
    const institution = await institutionService.updateInstitutionById(req.params.id, req.body);
    await invalidateCache('institutions:*');
    return successResponse(res, institution, "Institution updated successfully");
})

exports.deleteInstitution = asyncHandler(async (req, res) => {
    await institutionService.deleteInstitution(req.params.id);
    await invalidateCache('institutions:*');
    return successResponse(res, null, "Institution deleted successfully");
})