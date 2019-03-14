import express from 'express';
import messageController from '../controllers/message';
const router = express.Router();

router.post('/',messageController.sendMessage);


export default router;
