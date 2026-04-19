const express = require('express');
const router = express.Router();

const classController = require('./class.controller');
const authMiddleware = require('../../shared/middleware/auth.middleware');
const roleMiddleware = require('../../shared/middleware/role.middleware');

router.route('/')
    .get(classController.getAllClasses)
    .post(classController.createClass)

router.route('/:id')
    .get(classController.getClassById)
    .put(classController.updateClass)
    .delete(classController.deleteClass)

module.exports = router;