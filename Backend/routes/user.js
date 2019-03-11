
const express = require('express');

const router = express.Router();
const UserController = require('../controllers/user');

router.post('/api/v1/auth/signup', UserController.signUp);



module.exports = router;
