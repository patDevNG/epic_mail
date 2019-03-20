import express from 'express';
const router = express.Router();
import groupController from '../controllers/group';
import authentication from '../middlewares/auth';

router.post('/',authentication.verifyToken, groupController.createGroup);
router.get('/', authentication.verifyToken, groupController.getAllGroupInfo);
router.patch('/:id',authentication.verifyToken, groupController.editGroupName);



export default router;