import express from 'express';
const router = express.Router();
import groupController from '../controllers/group'

router.post('/',groupController.createGroup);
router.get('/',groupController.getAllGroupInfo);
router.patch('/:id',groupController.editGroupName);
router.delete('/:id',groupController.deleteGroup)



export default router;