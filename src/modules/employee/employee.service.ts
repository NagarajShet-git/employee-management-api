
import * as employeeRepository from './employee.repository';

export const createEmployee = async (data: any) => {
    const employee = await employeeRepository.createEmployee(data)
    return employee
}

export const getEmployees = async (page: number, limit: number, search: string, department: string, status: string, sort: string) => {
    return await employeeRepository.getEmployeeList(page, limit, search, department, status, sort)
}

export const getEmployeeById = async (id: string) => {
    return await employeeRepository.getEmployeeById(id)
}

export const updateEmployee = async (id: string, employeeData: any) => {
    return await employeeRepository.updateEmployee(employeeData, id)
}

export const deleteEmployee = async (id: string) => {
    return await employeeRepository.deleteEmployee(id)
}