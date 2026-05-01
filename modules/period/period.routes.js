const express = require('express');
const router = express.Router();
const {
    createPeriod,
    assignSubject,
    getAllPeriods,
    getPeriodById,
    deletePeriod
} = require('./period.controller')

const authMiddleware = require('../../shared/middleware/auth.middleware');
const roleMiddleware = require('../../shared/middleware/role.middleware');

router.use(authMiddleware);

router.route('/')
    .get(roleMiddleware('SUPER_ADMIN', 'ADMIN', 'TEACHER'), getAllPeriods)
    .post(roleMiddleware('SUPER_ADMIN', 'ADMIN', 'TEACHER'), createPeriod)

router.route('/:id')
    .get(roleMiddleware('SUPER_ADMIN', 'ADMIN', 'TEACHER'), getPeriodById)
    .put(roleMiddleware('SUPER_ADMIN', 'ADMIN', 'TEACHER'), assignSubject)
    .delete(roleMiddleware('SUPER_ADMIN', 'ADMIN', 'TEACHER'), deletePeriod)

module.exports = router;