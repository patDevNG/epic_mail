import express from 'express';
const router = express.Router();
import signUpController from '../controllers/signup'; 

router.post('/',signUpController.signUp);



export default router;