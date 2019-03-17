import express from 'express';
import route from '../../usingObjects/routes/root'

const router = express.Router();

router.use('/api/v1',route)

export default router;
