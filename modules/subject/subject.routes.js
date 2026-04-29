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
    .get(roleMiddleware('SUPER_ADMIN', 'ADMIN', 'TEACHER'), getAllSubjects)
    .post(roleMiddleware('SUPER_ADMIN', 'ADMIN', 'TEACHER'), createSubject)

router.post('/bulk', roleMiddleware('SUPER_ADMIN', 'ADMIN', 'TEACHER'), bulkCreateSubject)

router.route('/:id')
    .get(roleMiddleware('SUPER_ADMIN', 'ADMIN', 'TEACHER'), getSubjectById)
    .put(roleMiddleware('SUPER_ADMIN', 'ADMIN', 'TEACHER'), updateSubject)
    .delete(roleMiddleware('SUPER_ADMIN', 'ADMIN', 'TEACHER'), deleteSubject)

module.exports = router;