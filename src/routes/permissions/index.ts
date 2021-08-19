import { Router } from 'express';
import addOrUpdateRouter from './add-or-update';
import listRouter from './list';

const router = Router();

router.post('/', addOrUpdateRouter);
router.get('/', listRouter);

export default router;