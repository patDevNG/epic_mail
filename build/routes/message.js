import express from 'express';
import messageController from '../controllers/message';
const router = express.Router();
router.post('/', messageController.sendMessage);
router.get('/:id', messageController.getAllMessages); // 

router.get('/sent', messageController.getSentMessages);
router.get('/specific/:id', messageController.getSpecificMail);
router.delete('/message/:id', messageController.deleteAspecificMail);
export default router;