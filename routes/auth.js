const express = require('express');
const router = express.Router();
const {register, login, logout, verifyToken, getUsers, deleteUser, updateUser} = require('../controllers/auth');

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.post('/verifyToken', verifyToken);
router.get('/getUsers', getUsers)
router.delete('/deleteUser/:id', deleteUser);
router.patch('/updateUser/:id', updateUser);

module.exports = router;