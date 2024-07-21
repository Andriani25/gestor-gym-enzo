import express, { Router, Request, Response } from "express";
import users from './UserRoutes'

const router: Router = express.Router()

router.get('/', (req: Request, res: Response) => {
    res.send('holu')
  })
  
  router.use(users)

export default router;