import { Router } from 'express';
import { HelloController } from './hello.controller';
import { authMiddleware } from '../../common/middleware/auth.middleware';

const router = Router();

const helloController = new HelloController();

/*
 *
 * /test/hello:
 *   get:
 *     summary: Get hello message
 *     tags:
 *       - Hello
 *     responses:
 *       200:
 *         description: Success
 */
// router.get("/hello", helloController.hello);

/**
 * @swagger
 * /banner:
 *   get:
 *     summary: Get banner data
 *     tags:
 *       - 2. Module Information
 *     responses:
 *       200:
 *         description: Success
 */
router.get("/banner", helloController.getBanner);

/**
 * @swagger
 * /service:
 *   get:
 *     summary: Get service data
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - 2. Module Information
 *     responses:
 *       200:
 *         description: Success
 */
router.get("/service", authMiddleware, helloController.getService);

export default router;