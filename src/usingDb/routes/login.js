import express from 'express';
const router = express.Router();
import loginController from ''; 

router.post('/',loginController.login);



export default router;