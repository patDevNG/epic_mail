import express from 'express';
const router = express.Router();
import loginController from '../controllers/login'; 

router.post('/',loginController.login);



export default router;