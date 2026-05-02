const express = require('express');
const router = express.Router();
const {
    markAttendance,
    getAttendance,
    getAbsentPeriods,
    recoverAttendance,
    recoverAllAttendance
} = require('./attendance.controller')

const authMiddleware = require('../../shared/middleware/auth.middleware');
const roleMiddleware = require('../../shared/middleware/role.middleware');

router.use(authMiddleware);

router.route('/')
    .get(roleMiddleware('SUPER_ADMIN', 'ADMIN', 'TEACHER'), getAttendance)
    .post(roleMiddleware('SUPER_ADMIN', 'ADMIN', 'TEACHER'), markAttendance)

router.get('/absent/:studentId', roleMiddleware('SUPER_ADMIN', 'ADMIN', 'TEACHER'), getAbsentPeriods);
router.put('/recover-all/:studentId', roleMiddleware('SUPER_ADMIN', 'ADMIN', 'TEACHER'), recoverAllAttendance);

router.route('/:id')
    .put(roleMiddleware('SUPER_ADMIN', 'ADMIN', 'TEACHER'), recoverAllAttendance)

module.exports = router;