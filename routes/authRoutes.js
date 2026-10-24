const express = require('express');
const router = express.Router();
const { registerUser, loginUser, verifyEmail } = require('../controllers/authController');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/verify/:token', verifyEmail);

// YEH LINE LAZMI HAI
module.exports = router;