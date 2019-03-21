import express from 'express';
const router = express.Router();
import messageController from '../controllers/message'; 
import authentication from '../middlewares/auth'

router.post('/', messageController.sendMessage);



export default router;