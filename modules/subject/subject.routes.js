const express = require('express');
const router = express.Router();
const {
    createSubject,
    bulkCreateSubject,
    getAllSubjects,
    getSubjectById,
    updateSubject,
    deleteSubject
} = require('./subject.controller')

const authMiddleware = require('../../shared/middleware/auth.middleware')
const roleMiddleware = require('../../shared/middleware/role.middleware')

router.route('/')
    .get(getAllSubjects)
    .post(createSubject)

router.route('/:id')
    .get(getSubjectById)
    .put(updateSubject)
    .delete(deleteSubject)

module.exports = router;