import { Router } from 'express'
import { createEmployee, getListOfEmployees, getEmployeeById, updateEmployee, deleteEmployee } from '../modules/employee/employee.controller'
import { validateEmployee } from '../middleware/employee.validate'
import { createEmployeeSchema } from '../validations/employee.validation'

const router = Router()

router.post('/', validateEmployee(createEmployeeSchema), createEmployee)
router.get('/', getListOfEmployees)
router.get('/:id', getEmployeeById)
router.put('/:id', updateEmployee)
router.delete('/:id', deleteEmployee)

export default router