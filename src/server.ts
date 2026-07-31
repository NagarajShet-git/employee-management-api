
import app from './app'
import {env} from  './config/env'

import { connectDatabase } from "./database/connection";
const startServer = async () => {
    await connectDatabase();
    app.listen(env.PORT, () => {
        console.log('Server running at port ' + env.PORT)
    })
}

startServer()