import { Router } from 'express'
import employeeRoutes from './employee.route'

const router = Router()

router.use('/employees', employeeRoutes)

export default router