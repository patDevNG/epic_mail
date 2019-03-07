
const express = require('express');

const router = express.Router();
const UserController = require('../controllers/user');

router.post('/api/v1/auth/signup', UserController.signUp);
router.post('/api/v1/auth/login', UserController.login);


module.exports = router;
