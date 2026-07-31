import mongoose from "mongoose";

export const connectDatabase = async () => {

    try {

        await mongoose.connect(
            "mongodb://localhost:27017/employee-management"
        );

        console.log("MongoDB connected");

    } catch (error) {

        console.error("MongoDB connection failed");

        process.exit(1);
    }
};