import express from 'express';
const router = express.Router();
import messageController from '../controllers/message'; 

router.post('/',messageController.sendMessage);



export default router;