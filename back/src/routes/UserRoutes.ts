import express, { Router, Request, Response, NextFunction } from "express";
import { getAllUsers, createUser, deleteUser, updateUser } from "../dbFirebase/db";
import dotenv from 'dotenv'
import jwt, {JwtPayload as DefaultJwtPayload} from 'jsonwebtoken'

const router: Router = express.Router()
dotenv.config()

router.post('/login', (req: Request, res: Response) => {

    const {user, password} = req.body
  
    if(user === 'gym_gestor' && password === '123'){
    const token = jwt.sign({
        user
    }, 'secret', {
      expiresIn: '4h'
    })
    res
    .cookie('acces_token', token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 1000 * 60 * 60 * 4 // 1hs
    })
    .send({user, token})
  }

  res.status(401).send('Username or password incorrect')

}
)

router.get('/logout', (req: Request, res: Response) => {
  res.status(200).cookie('acces_token', '', {
    maxAge: 1
  }).send("Log Out")
})

router.get('/protected', (req: Request, res: Response) => {

  const {user} = req.session
  
  try{

    if(user){
      res.status(203).send(user)
    }else{
      res.status(401).send('Not authenticated')
    }

  }catch(error){
    res.status(500).send('Error at user access')
    
  }

})

router.get('/getUsers', async (req: Request, res: Response) => {

try{

  const allUsers = await getAllUsers()

  if(allUsers){
    res.json(allUsers)
  }else{
    res.status(400).send('Error at getUsers')
  }



}catch(error){
  res.status(400).send("Users not finded")
}

})


router.post('/createUser', async (req: Request, res: Response) => {

  const { user } = req.session

  if(user){

    try{
  
      const userData = req.body
  
      console.log(req.body, 'UPDATE USER REQ.BODY')
  
      if(userData){

        try{

          const responseDB = await createUser(userData)

          if(responseDB){

            res.status(200).send('User created')
          }


        }catch(error){
          console.error('Error at updateUser DB function')
        }
      }else{
        res.status(400).send("Error at upload user!")
      }
      
    }catch(error){
  
      console.error("User data not recieved")
  
      res.status(400).send("User data not recieved")
  
    }
  }else{
    res.status(401).send('Unauthorized for UserRoutes/updateUser')
  }
  

  })

  router.put('/updateUser', async (req: Request, res: Response) => {

    const { user } = req.session
  
    if(user){
  
      try{
    
        const userData = req.body
    
        console.log(req.body, 'UPDATE USER REQ.BODY')
    
        if(userData){
  
          try{
  
           await updateUser(userData)

             res.status(200).send('User updated')
  
          }catch(error){
            console.error('Error at updateUser DB function')
          }
        }else{
          res.status(400).send("Error at upload user!")
        }
        
      }catch(error){
    
        console.error("User data not recieved")
    
        res.status(400).send("User data not recieved")
    
      }
    }else{
      res.status(401).send('Unauthorized for UserRoutes/updateUser')
    }
    
  
    })

  router.delete("/deleteUser", async (req: Request, res: Response) => {
    const {user} = req.session
    
    if(user){
      
          const {email} = req.body

       if(email){
         try{
  
        await deleteUser(email)
  
         res.send('User deleted succesfully')
  
         }catch(error){
  
           res.send("Error at delete user process!")
  
         }
       }
    }else{
       res.status(401).send("Unauthorized for userRoutes/deleteUser !")
     }



  } )

export default router;