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

router.use(authMiddleware);

router.route('/')
    .get(roleMiddleware('SUPER_ADMIN', 'ADMIN'), getAllSubjects)
    .post(roleMiddleware('SUPER_ADMIN', 'ADMIN'), createSubject)

router.route('/:id')
    .get(roleMiddleware('SUPER_ADMIN', 'ADMIN'), getSubjectById)
    .put(roleMiddleware('SUPER_ADMIN', 'ADMIN'), updateSubject)
    .delete(roleMiddleware('SUPER_ADMIN', 'ADMIN'), deleteSubject)

module.exports = router;