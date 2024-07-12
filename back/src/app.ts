import dotenv from "dotenv"
import morgan from "morgan"
import cors from "cors"
import express, { Express } from "express"
import { initializeFirebaseApp } from "./dbFirebase/db"
import index from "./routes/index"

dotenv.config()

const app: Express = express()

// Express & Firebase settings

initializeFirebaseApp()

app.use(cors())
app.set('port', process.env.PORT || 3000)

// middlewares

app.use(morgan('dev'))
app.use(express.json())

// routes

app.use('/', index)

export default app;