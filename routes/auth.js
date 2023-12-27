const express = require('express');
const router = express.Router();
const {register, login, logout, verifyToken} = require('../controllers/auth');

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.post('/verifyToken', verifyToken);

module.exports = router;