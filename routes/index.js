const express = require('express');
const router = express.Router();

const authRoutes = require('../modules/auth/auth.routes');
const institutionRoutes = require('../modules/institution/institution.routes');
const studentRoutes = require('../modules/student/student.routes');
const teacherRoutes = require('../modules/teacher/teacher.routes');
const classRoutes = require('../modules/class/class.routes');
const divisionRoutes = require('../modules/division/division.routes');
const subjectRoutes = require('../modules/subject/subject.routes');
const periodRoutes = require('../modules/period/period.routes');
const attendanceRoutes = require('../modules/attendance/attendance.routes');
const donationRoutes = require('../modules/donation/donation.routes');

router.get('/help', (req, res) => {
    res.json({
        success: true,
        message: 'API is running successfully',
    })
})

router.use('/auth', authRoutes);
router.use('/institutions', institutionRoutes);
router.use('/students', studentRoutes);
router.use('/teachers', teacherRoutes);
router.use('/classes', classRoutes);
router.use('/divisions', divisionRoutes);
router.use('/subjects', subjectRoutes);
router.use('/periods', periodRoutes);
router.use('/attendance', attendanceRoutes);
router.use('/donations', donationRoutes);

module.exports = router;