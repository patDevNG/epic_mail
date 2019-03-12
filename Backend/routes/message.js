const express = require('express');

const router = express.Router();

const messageController = require('../controllers/message');

router.post('/messages', messageController.sendMessage);
router.get('/messages/:id', messageController.getAllRecivedMessages);


module.exports = router;
 