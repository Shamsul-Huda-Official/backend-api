const express = require('express');
const router = express.Router();
const {
    createStudent,
    bulkCreateStudent,
    getAllStudents,
    getStudentById,
    updateStudent,
    deleteStudent
} = require('./student.controller')

const authMiddleware = require('../../shared/middleware/auth.middleware');
const roleMiddleware = require('../../shared/middleware/role.middleware');

router.use(authMiddleware)

router.route('/')
    .get(roleMiddleware('SUPER_ADMIN', 'ADMIN', 'TEACHER'), getAllStudents)
    .post(roleMiddleware('SUPER_ADMIN', 'ADMIN', 'TEACHER'), createStudent)

router.post('/bulk', roleMiddleware('SUPER_ADMIN', 'ADMIN', 'TEACHER'), bulkCreateStudent);

router.route('/:id')
    .get(roleMiddleware('SUPER_ADMIN', 'ADMIN', 'TEACHER'), getStudentById)
    .put(roleMiddleware('SUPER_ADMIN', 'ADMIN', 'TEACHER'), updateStudent)
    .delete(roleMiddleware('SUPER_ADMIN', 'ADMIN', 'TEACHER'), deleteStudent)

module.exports = router;