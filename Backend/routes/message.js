const express = require('express');

const router = express.Router();

const messageController = require('../controllers/message');

router.post('/messages', messageController.sendMessage);
router.get('/messages/:id', messageController.getAllRecivedMessages);
router.get('/messages/unread/:id',messageController.getUnreadMeassages);
router.get('/messages/sent/:id', messageController.getSentMessages);


module.exports = router;
 