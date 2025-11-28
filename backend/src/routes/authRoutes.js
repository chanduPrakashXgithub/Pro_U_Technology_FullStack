import express from 'express';
import { loginPost, registerPost, meGet } from '../controllers/authController.js';
import { authenticate } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/login', loginPost);
router.post('/register', registerPost);
router.get('/me', authenticate, meGet);

export default router;