
import { Employee } from './employee.model'

export const createEmployee = async (employeeData: any) => {
    let employee = await Employee.create(employeeData)
    return employee
};

export const getEmployeeList = async (page: number, limit: number, search: string, department: string, status: string, sort: string) => {
    const skip = (page - 1) * limit;
    const filter: any = {}
    if (search) {
        filter.$or = [
            { name: { $regex: search, $options: "i" } },
            { email: { $regex: search, $options: "i" } },
        ]
    }
    if (department) {
        filter.department = department
    }
    if (status) {
        filter.status = status
    }
    const [employees, total] = await Promise.all([Employee.find(filter).sort(sort).skip(skip).limit(limit), Employee.countDocuments(filter)])
    return {
        employees,
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
    }
}

export const getEmployeeById = async (id: string) => {
    return await Employee.findById(id)
}

export const updateEmployee = async (employeeData: any, id: string) => {
    return await Employee.findByIdAndUpdate(id, employeeData, { new: true, runValidators: true })
}

export const deleteEmployee = async (id: string) => {
    return await Employee.findByIdAndDelete(id)
}