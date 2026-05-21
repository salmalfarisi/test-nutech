import { Router } from 'express';
import helloRoutes from '../modules/hello/hello.routes';
import authRoutes from '../modules/auth/auth.routes';
import transactionRoutes from '../modules/transaction/transaction.routes';

const router = Router();

router.use('/', helloRoutes);
router.use('/', authRoutes);
router.use('/', transactionRoutes);

export default router;