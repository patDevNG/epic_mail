import express from 'express';
import auth from './auth';
import message from './message';
import groups from '../routes/groups';
const router = express.Router();


router.use('/auth',auth);
router.use('/messages',message);
router.use('/groups',groups);

export default router;
