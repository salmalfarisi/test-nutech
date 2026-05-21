import { Router } from 'express';
import { TransactionController } from './transaction.controller';
import { validateDto } from '../../common/middleware/validate';
import { TopUpAmountDTO, TransactionDTO } from './dto/transaction.dto';
import { authMiddleware } from '../../common/middleware/auth.middleware';

const router = Router();

const route = new TransactionController();

/**
 * @swagger
 * /topup:
 *   post:
 *     summary: Create account
 *     tags:
 *       - 3. Module Transaction
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - top_up_amount
 *             properties:
 *               top_up_amount:
 *                 type: number
 *                 example: 1000000
 *     responses:
 *       200:
 *         description: Success
 */
router.post("/topup", authMiddleware, validateDto(TopUpAmountDTO), route.topUpBalance);

/**
 * @swagger
 * /transaction:
 *   post:
 *     summary: Create transaction
 *     tags:
 *       - 3. Module Transaction
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - service_code
 *             properties:
 *               service_code:
 *                 type: string
 *                 example: TEST
 *     responses:
 *       200:
 *         description: Success
 */
router.post("/transaction", authMiddleware, validateDto(TransactionDTO), route.postTransaction);

/**
 * @swagger
 * /transaction/history:
 *   get:
 *     summary: Get profile
 *     tags:
 *       - 3. Module Transaction
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: offset
 *         required: false
 *         schema:
 *           type: number
 *           example: 1
 *       - in: query
 *         name: limit
 *         required: false
 *         schema:
 *           type: number
 *           example: 10
 *     responses:
 *       200:
 *         description: Success
 */
router.get("/transaction/history", authMiddleware, route.transactionHistory);

export default router;