import dotenv from "dotenv"
import morgan from "morgan"
import cors from "cors"
import express, { Express, Request, Response, NextFunction } from "express"
import { initializeFirebaseApp } from "./dbFirebase/db"
import index from "./routes/index"
import cookieParser from 'cookie-parser'
import jwt, {JwtPayload as DefaultJwtPayload} from 'jsonwebtoken'

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

interface JwtPayload extends DefaultJwtPayload {
    user: string
    }


app.use((req: Request, res: Response, next: NextFunction) => {

    const token = req.cookies.acces_token
 
    req.session = {user: null} 
 
    try{
 
      const data = jwt.verify(token, 'secret') as JwtPayload
 
      if(data){
      req.session.user = data.user
      console.log('Token access', req.session.user)
      }
 
 
    }catch(error){
 
 
      console.error('No token')
 
 
    }
   
    next()
 
  })

// routes

app.use('/', index)

export default app;