import { Router } from 'express';
import loginRouter from './login';
import authRouter from './auth';
import permissionsRouter from './permissions';

const router = Router();

router.use('/login', loginRouter);
router.use('/auth', authRouter);
router.use('/permissions', permissionsRouter);

export default router;