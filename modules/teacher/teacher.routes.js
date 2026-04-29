const express = require('express');
const router = express.Router();

const {
    createTeacher,
    bulkCreateTeacher,
    getAllTeachers,
    getTeacherById,
    updateTeacher,
    deleteTeacher
} = require('./teacher.controller')

const authMiddleware = require('../../shared/middleware/auth.middleware');
const roleMiddleware = require('../../shared/middleware/role.middleware');

router.use(authMiddleware)

router.route('/')
    .get(roleMiddleware('SUPER_ADMIN', 'ADMIN'), getAllTeachers)
    .post(roleMiddleware('SUPER_ADMIN', 'ADMIN'), createTeacher)

router.post('/bulk', roleMiddleware('SUPER_ADMIN', 'ADMIN'), bulkCreateTeacher)

router.route('/:id')
    .get(roleMiddleware('SUPER_ADMIN', 'ADMIN'), getTeacherById)
    .put(roleMiddleware('SUPER_ADMIN', 'ADMIN'), updateTeacher)
    .delete(roleMiddleware('SUPER_ADMIN', 'ADMIN'), deleteTeacher)

module.exports = router;