const express = require('express');
const router = express.Router();

const {
    getAllClasses,
    createClass,
    getClassById,
    updateClass,
    deleteClass,
} = require('./class.controller');
const authMiddleware = require('../../shared/middleware/auth.middleware');
const roleMiddleware = require('../../shared/middleware/role.middleware');

router.use(authMiddleware);

router.route('/')
    .get(roleMiddleware('SUPER_ADMIN', 'ADMIN', 'TEACHER'), getAllClasses)
    .post(roleMiddleware('SUPER_ADMIN', 'ADMIN', 'TEACHER'), createClass)

router.route('/:id')
    .get(roleMiddleware('SUPER_ADMIN', 'ADMIN', 'TEACHER'), getClassById)
    .put(roleMiddleware('SUPER_ADMIN', 'ADMIN', 'TEACHER'), updateClass)
    .delete(roleMiddleware('SUPER_ADMIN', 'ADMIN', 'TEACHER'), deleteClass)

module.exports = router;