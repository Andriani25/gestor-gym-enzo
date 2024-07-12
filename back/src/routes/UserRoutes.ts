import express, { Router, Request, Response } from "express";
import { getAllUsers, updateUser, deleteUser } from "../dbFirebase/db";

const router: Router = express.Router()

router.get('/getUsers', async (req: Request, res: Response) => {

try{

  const allUsers = await getAllUsers()

  console.log(allUsers, 'ALL USERS USER ROUTES')

  res.json(allUsers)

}catch(error){
  res.status(400).send("Users not finded")
}

})


router.post('/updateUser', async (req: Request, res: Response) => {
  
  try{

    const userData = req.body

    console.log(req.body, 'USER DATA REQ.BODY')

    if(userData){

      try{

        await updateUser(userData)

      }catch(error){

        res.status(400).send("Error at upload user!")

      }


    }
    
    res.send('Data recieved')

  }catch(error){

    console.log("User data not recieved", error)

    res.status(400).send("User data not recieved")

  }

  })

  router.delete("/deleteUser", (req: Request, res: Response) => {

    const email = req.body.email

     if(email){
       try{

       deleteUser(email)

       res.send('User deleted succesfully')

       }catch(error){

         res.send("Error at delete user process!")

       }
     }


  } )

export default router;