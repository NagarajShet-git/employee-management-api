import { Router } from 'express'
import employeeRoutes from './employee.route'
import authRoutes from './auth.routes'
import { verifyToken } from '../middleware/auth.middleware';

const router = Router()

router.use('/employees', verifyToken, employeeRoutes);
router.use('/auth', authRoutes)

export default router