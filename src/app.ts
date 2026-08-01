import express from 'express'
import routes from './routes'
import { errorHandler } from './common/errorHandler'
import morgan from 'morgan'
import cors from 'cors'

const allowedOrigins = [
    "http://localhost:3000",
    "http://localhost:5173",
    "https://employee-management-api-ppet.onrender.com",
];

const app = express()
app.use(express.json())
app.use(cors({
    origin: (origin, callback) => {
        // Allow requests with no Origin header (e.g., Postman, curl)
        if (!origin) {
            return callback(null, true);
        }

        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        }

        return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
}))
app.use(morgan("dev"));
app.use(errorHandler)
app.use(routes)

export default app