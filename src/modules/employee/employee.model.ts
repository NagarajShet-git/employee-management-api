import mongoose, { Schema } from "mongoose";
import { Employee as EmployeeType } from "../../common/employee.interface";


const employeeSchema = new Schema<EmployeeType>(
    {

        firstName: {
            type: String,
            required: true
        },


        lastName: {
            type: String,
            required: true
        },


        email: {
            type: String,
            required: true,
            unique: true
        },


        department: {
            type: String,
            required: true
        },


        designation: {
            type: String,
            required: true
        },


        salary: {
            type: Number,
            required: true
        },


        joiningDate: {
            type: Date,
            required: true
        },


        status: {
            type: String,
            default: "ACTIVE"
        }

    },
    {
        timestamps: true
    }
);


export const Employee =
    mongoose.model(
        "Employee",
        employeeSchema
    );