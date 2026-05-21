import { Router } from 'express';
import { AuthController } from './auth.controller';
import { validateDto } from '../../common/middleware/validate';
import { LoginDTO, ProfileDTO, RegisterDTO } from './dto/auth.dto';
import { authMiddleware } from '../../common/middleware/auth.middleware';
import { uploadImage } from '../../common/middleware/upload';
import { validate } from 'class-validator';

const router = Router();

const route = new AuthController();

/**
 * @swagger
 * /registration:
 *   post:
 *     summary: Create account
 *     tags:
 *       - 1. Module Membership
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - firstName
 *               - lastName
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: test@mail.com
 *               first_name:
 *                 type: string
 *                 example: John
 *               last_name:
 *                 type: string
 *                 example: Doe
 *               password:
 *                 type: string
 *                 example: 12345678
 *     responses:
 *       200:
 *         description: Success
 */
router.post("/registration", validateDto(RegisterDTO), route.register);

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Set login for user
 *     tags:
 *       - 1. Module Membership
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: test@mail.com
 *               password:
 *                 type: string
 *                 example: 12345678
 *     responses:
 *       200:
 *         description: Success
 */
router.post("/login", validateDto(LoginDTO), route.login);

/**
 * @swagger
 * /profile:
 *   get:
 *     summary: Get profile
 *     tags:
 *       - 1. Module Membership
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 */
router.get("/profile", authMiddleware, route.profile);

/**
 * @swagger
 * /balance:
 *   get:
 *     summary: Get balance amount0
 *     tags:
 *       - 3. Module Transaction
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 */
router.get("/balance", authMiddleware, route.getBalance);

/**
 * @swagger
 * /profile/update:
 *   put:
 *     summary: Update user profile
 *     tags:
 *       - 1. Module Membership
 *
 *     security:
 *       - bearerAuth: []
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               first_name:
 *                 type: string
 *                 example: John
 *               last_name:
 *                 type: string
 *                 example: Doe
 *               password:
 *                 type: string
 *                 example: 12345678
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *       401:
 *         description: Unauthorized
 */
router.put(
  "/profile/update",
  authMiddleware,
  validateDto(ProfileDTO),
  route.updateDataProfile
);

/**
 * @swagger
 * /profile/image:
 *   put:
 *     summary: Update user profile image
 *     tags:
 *       - 1. Module Membership
 *
 *     security:
 *       - bearerAuth: []
 *
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               profile_image:
 *                 type: string
 *                 format: binary
 *                 description: Upload profile image
 *
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *       401:
 *         description: Unauthorized
 */
router.put(
  "/profile/image",
  authMiddleware,
  uploadImage,
  route.updateDataImage
);

export default router;