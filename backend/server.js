import "./config/env.js"
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import authRouter from './routes/authRoutes.js'
import categoryRouter from './routes/categoryRoutes.js'
import productRouter from './routes/productRoutes.js'
import cartRouter from './routes/cartRoutes.js'
import orderRouter from './routes/orderRoutes.js'
import superadminRouter from './routes/superadminRoutes.js'
import notificationRouter from './routes/notificationRoutes.js'
import supportRouter from './routes/supportRoutes.js'

const requiredEnvironment = ["MONGO_URI", "JWT_SECRET"]
const missingEnvironment = requiredEnvironment.filter((key) => !process.env[key]?.trim())

if (missingEnvironment.length > 0) {
    console.error(`Missing required environment variables: ${missingEnvironment.join(", ")}`)
    console.error("Create backend/.env from backend/.env.example, then restart the server.")
    process.exit(1)
}

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

mongoose.connect(process.env.MONGO_URI, { dbName: process.env.MONGO_DB || "web_dev" }).then(() => {
    console.log("Database connected")
}).catch((err) => {
    console.error("Database connection failed:", err.message)
    process.exitCode = 1
})

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use('/api/auth', authRouter)
app.use('/api/category',categoryRouter)
app.use('/api/product',productRouter)
app.use('/api/cart',cartRouter)
app.use('/api/order',orderRouter)
app.use('/api/superadmin', superadminRouter)
app.use('/api/notification', notificationRouter)
app.use('/api/support', supportRouter)

app.listen(4000, () => {
    console.log(`Server is running on port ${4000}`)
})