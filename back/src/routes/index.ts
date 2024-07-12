import express, { Router, Request, Response } from "express";
import test from './UserRoutes'

const router: Router = express.Router()

router.get('/', (req: Request, res: Response) => {
    res.send('Hello World!')
  })
  
  router.use(test)

export default router;