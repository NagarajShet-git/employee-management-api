import { Request, Response } from "express";
import * as createEmployeeService from "./employee.service";

const commonErrorHandler = (_req: Request, res: Response, error: Error) => {
    return res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : 'Internal Server error'
    })
}

export const createEmployee = async (req: Request, res: Response) => {
    try {
        const employee = await createEmployeeService.createEmployee(req.body)
        return res.status(201).json({
            success: true,
            message: 'Employee created successfully',
            data: employee
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error instanceof Error ? error.message : 'Internal Server error'
        })
    }
}

export const getListOfEmployees = async (req: Request, res: Response) => {
    try {
        const page = Number(req.query.page) || 1
        const limit = Number(req.query.limit) || 10

        const search = req.query.search as string || ''
        const department = (req.query.department as string) || ''
        const status = (req.query.status as string) || ''
        const sort = (req.query.sort as string) || "firstName";

        const employees = await createEmployeeService.getEmployees(page, limit, search, department, status, sort)
        if (!employees) {
            return res.status(404).json({
                success: false,
                message: 'No employees found'
            })
        }
        return res.status(200).json({
            success: true,
            message: 'Employee list',
            data: employees
        })

    } catch (error) {
        return commonErrorHandler(req, res, error as Error)
    }
}

export const getEmployeeById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const employee = await createEmployeeService.getEmployeeById(id as string)
        if (!employee) {
            return res.status(404).json({
                success: false,
                message: 'No employee found'
            })
        } else {
            return res.status(200).send(employee)
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error instanceof Error ? error.message : 'Internal Server error'
        })
    }
}

export const updateEmployee = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const employeeData = req.body
        const employee = await createEmployeeService.updateEmployee(id as string, employeeData)
        if (!employee) {
            return res.status(404).json({
                success: false,
                message: 'Employee not found',
            });
        }
        return res.status(200).json({
            success: true,
            message: 'updated',
            data: employee
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error instanceof Error ? error.message : 'Internal Server error'
        })
    }

}

export const deleteEmployee = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const employee = await createEmployeeService.deleteEmployee(id as string)
        return res.status(200).send({
            success: true,
            message: 'Employee Deleted Successfully',
            data: employee
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error instanceof Error ? error.message : 'Internal Server error'
        })
    }

}