import express from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'
import connectDb from './mongodb/connect.js'
import userRouter from './routes/userRoutes.js'
import propertyRouter from './routes/propertyRoutes.js'

dotenv.config()

const app = express();
app.use(cors())
app.use(express.json({ limit: "50mb" }))

app.get("/", (req, res) => {
    res.send("Hello world")
})

app.use("/api/v1/users", userRouter)
app.use("/api/v1/properties", propertyRouter)

const startServer = async () => {
    try {
        await connectDb(process.env.MONGODB_URL)
        const PORT = process.env.PORT || 8080
        app.listen(PORT, () => {
            console.log(`server is running on port ${process.env.PORT}`)
        })
    } catch (err) {
        console.error("Connection Failed", err)
    }
}

startServer()