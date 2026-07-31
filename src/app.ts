import express from 'express'
import routes from './routes'
import { errorHandler } from './common/errorHandler'
import morgan from 'morgan'

const app = express()
app.use(express.json())
app.use(morgan("dev"));
app.use(errorHandler)
app.use(routes)

export default app