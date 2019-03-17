import express from 'express';
const router = express.Router();
import signUpController from '../controllers/signup'; 

router.get('/',signUpController.signUp);



export default router;