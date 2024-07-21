import dotenv from "dotenv"
import morgan from "morgan"
import cors from "cors"
import express, { Express } from "express"
import { initializeFirebaseApp } from "./dbFirebase/db"
import index from "./routes/index"
import cookieParser from 'cookie-parser'

dotenv.config()

const app: Express = express()

// Express & Firebase settings

initializeFirebaseApp()

app.set('port', process.env.PORT || 3000)

// middlewares

app.use(cors({
    origin: process.env.CLIENT || 'http://localhost:5173',

    credentials: true
}))
app.use(morgan('dev'))
app.use(express.json())
app.use(cookieParser())

// routes

app.use('/', index)

export default app;