const subjectService = require('./subject.service')
const asyncHandler = require('../../shared/utils/asyncHandler')
const { invalidateCache } = require('../../shared/utils/cache')
const { successResponse } = require('../../shared/utils/responseFormatter')

exports.createSubject = asyncHandler(async (req, res) => {
    const institutionId = req.user.institutionId;
    const subject = await subjectService.createSubject({ ...req.body, institutionId });
    await invalidateCache('subject:*')
    return successResponse(res, subject, "Institution created successfully")
})

exports.bulkCreateSubject = asyncHandler(async (req, res) => {
    const institutionId = req.user.institutionId
    const { classId, divisionId, names } = req.body 

    const result = await subjectService.bulkCreateSubjects({
        names,
        institutionId,
        classId,
        divisionId
    })

    return successResponse(res, result, 'Subjects were uploaded successfully.')
})

exports.getAllSubjects = asyncHandler(async (req, res) => {
    console.log('USER: ', req.user)
    const institutionId = req.user.institutionId
    const { classId, divisionId } = req.query

    const subjects = await subjectService.getAllSubjects({
        institutionId,
        classId,
        divisionId
    })
    return successResponse(res, subjects, 'All subject fetched successfully.')
})

exports.getSubjectById = asyncHandler(async (req, res) => {
    const institutionId = req.user.institutionId;
    const subject = await subjectService.getSubjectById(req.params.id, institutionId)
    return successResponse(res, subject, 'Subject by id fetched successfully')
})
 
exports.updateSubject = asyncHandler( async(req, res) => {
    const institutionId = req.user.institutionId;
    const subject = await subjectService.updateSubject(req.params.id, institutionId, req.body)
    await invalidateCache('subject:*')
    return successResponse(res, subject, 'Subject updated successfully');
})

exports.deleteSubject = asyncHandler(async (req, res) => {
    const institutionId = req.user.institutionId;
    const subject = await subjectService.deleteSubject(req.params.id, institutionId)
    await invalidateCache('subject:*')
    return successResponse(res, null, 'Subject deleted successfully')
})