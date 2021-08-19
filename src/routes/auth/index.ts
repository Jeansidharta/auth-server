import { Router } from 'express';
import signRouter from './sign';
import signRootRouter from './sign-root';
import verifyRouter from './verify';

const router = Router();

router.use('/sign', signRouter);
router.use('/sign-root', signRootRouter);
router.use('/verify', verifyRouter);

export default router;