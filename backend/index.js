import express from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'
import connectDb from './mongodb/connect.js'

dotenv.config()

const app = express();
app.use(cors())
app.use(express.json({ limit: "50mb" }))

const startServer = async () => {
    try {
        connectDb(process.env.MONGODB_URL)
        app.listen(process.env.PORT, () => {
            console.log(`server is running on port ${process.env.PORT}`)
        })
    } catch (err) {
        console.error("Connection Failed", err)
    }
}

startServer()