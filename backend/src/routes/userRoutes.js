import express from 'express';
import { register, login, getCurrentUser } from '../controllers/userController.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.post('/register', register);
router.post('/login', login);

// Protected routes
router.get('/me', auth, getCurrentUser);

export default router; 