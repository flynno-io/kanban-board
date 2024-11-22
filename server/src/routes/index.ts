import { Router } from 'express';
import authRoutes from './auth-routes.js';
import apiRoutes from './api/index.js';
import { authenticateToken } from '../middleware/auth.js';

const router = Router();

// Use the authRoutes for the /auth path
router.use('/auth', authRoutes);

// Use the authenticateToken middleware for the /api path
router.use('/api', authenticateToken, apiRoutes);

export default router;
