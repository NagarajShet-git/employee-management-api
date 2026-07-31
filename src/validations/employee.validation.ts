import { z } from 'zod';

export const createEmployeeSchema = z.object({
    firstName: z.string().min(2, "Name must have at least 2 characters"),
    lastName: z.string().min(2, "Last name must have at least 2 characters"),
    email: z.email('Invalid Email'),
    department: z.string()
        .min(2, "Department is required"),

    designation: z.string()
        .min(2, "Designation is required"),

    salary: z.number()
        .positive("Salary must be positive")
})

export const updateEmployeeSchema = createEmployeeSchema.partial();