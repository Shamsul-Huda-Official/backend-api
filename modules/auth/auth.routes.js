const express = require('express');
const router = express.Router();
const {
    createUser,
    loginUser,
} = require('./auth.controller');

router.post('/register', createUser);
router.post('/login', loginUser);


module.exports = router;