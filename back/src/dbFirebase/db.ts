// Import the functions you need from the SDKs you need

import { FirebaseApp, initializeApp } from "firebase/app";
import dotenv from 'dotenv'
import { getFirestore, Firestore, doc, collection, setDoc, deleteDoc, getDocs, DocumentData } from 'firebase/firestore'
dotenv.config()

const { FIREBASE_KEY, AUTH_DOMAIN, PROJECT_ID, STORAGE_BUCKET, MESSAGING_SENDER_ID, APP_ID } = process.env

export interface Data {
  name: string,
  payDate: string,
  cellPhone? : number,
  expireDate: string,
  email: string
}
export interface userData {
  email: string,
  data: Data
}



// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: FIREBASE_KEY,
  authDomain: AUTH_DOMAIN,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID
};

// Initialize Firebase

let app: FirebaseApp;
let firestoreDB: Firestore;

export const initializeFirebaseApp = () => {
  try{
    app = initializeApp(firebaseConfig)
    firestoreDB = getFirestore()
  }catch(error){
    console.log('Error at initializeFirebaseApp')
  }
}

export const getFirebaseApp = () => app;

// Upload Firebase Data

export const getAllUsers = async (  ) => {

  try{

  const collectionData = await getDocs(collection(firestoreDB, "Users"))

  let users: DocumentData = []

  collectionData.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    

    users.push(doc.data())

  })

  return users

  }catch(error){
    
    console.log("Error at getting all users!", error)


  }

}


export const createUser = async ( { name, payDate, cellPhone, expireDate, email }: Data ) => {


 const userData: userData = {
    email,
    data: {
      name,
      email,
      payDate,
      cellPhone,
      expireDate
    }
 }

 console.log(userData, "USER DATA DB")

 try{
    
    const document = doc(firestoreDB, "Users", email )
  
   await setDoc(document, userData)
  
    return true


 }catch(error){
  console.log("ERROR AT FILE UPLOAD", error)
 }


}

export const updateUser = async ({ name, payDate, cellPhone, expireDate, email }: Data) => {


  if(email){

    try{
      
    const userToModify = doc(firestoreDB, 'Users', email)

     await setDoc(userToModify, {
      email,
      data: {
        name,
        payDate,
        cellPhone,
        expireDate,
        email
      }
    })


    }catch(error){
      console.error('Error at updateUser firebaseDB')
    }

  }

}

export const deleteUser = async (email: string) => {

  if(email){
    
    try {
  
     await deleteDoc(doc(firestoreDB, 'Users', email))
  
     return console.log("User deleted")
  
    }catch(error){

    return console.log('Delete process error!')

    }

  }

 return console.log('Email not founded')

}