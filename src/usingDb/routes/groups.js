import express from 'express';
const router = express.Router();
import groupController from '../controllers/group'

router.post('/',groupController.createGroup);
router.get('/',groupController.getAllGroupInfo);



export default router;