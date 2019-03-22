import express from 'express';
const router = express.Router();
import messageController from '../controllers/message'; 
import authentication from '../middlewares/auth'

router.post('/',authentication.verifyToken, messageController.sendMessage);
router.get('/',authentication.verifyToken,messageController.getAllMessages);
router.get('/messages/unread',authentication.verifyToken,messageController.getAllUnreadMessages);
router.get('/messages/sent',authentication.verifyToken,messageController.getSentMails);
router.get('/messages/inbox',authentication.verifyToken,messageController.getAllInboxMessages);
router.delete('/messages/:id',authentication.verifyToken,messageController.deleteMessage);



export default router;