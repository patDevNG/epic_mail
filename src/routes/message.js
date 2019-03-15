import express from 'express';
import messageController from '../controllers/message';
const router = express.Router();

router.post('/',messageController.sendMessage);
router.get('/:email',messageController.getAllMessages);


export default router;
