const express = require('express');
const router = express.Router();
const {
    createUser,
    loginUser,
} = require('./auth.controller');

router.post('/register', authController.createUser);
router.post('/login', authController.loginUser);

// router.get('/:id', authController.findById);

module.exports = router;