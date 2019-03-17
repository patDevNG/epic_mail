import express from 'express';
import route from './root'

const router = express.Router();

router.use('/api/v2',route)

export default router;