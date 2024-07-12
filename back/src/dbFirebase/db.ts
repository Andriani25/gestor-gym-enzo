// Import the functions you need from the SDKs you need

import { FirebaseApp, initializeApp } from "firebase/app";
import dotenv from 'dotenv'
import { getFirestore, Firestore, doc, collection, setDoc, deleteDoc, getDoc, getDocs, DocumentData } from 'firebase/firestore'

dotenv.config()

const { FIREBASE_KEY, AUTH_DOMAIN, PROJECT_ID, STORAGE_BUCKET, MESSAGING_SENDER_ID, APP_ID } = process.env

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

interface userData {
    name: string,
    monthsPayed?: [],
    cellPhone? : number,
    totalDebt?: number,
    email: string
}

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

  const allUsers = collectionData.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    

    users.push(doc.data())

  })
  
  return users

  }catch(error){
    
    console.log("Error at getting all users!")

  }

}


export const updateUser = async ( { name, monthsPayed, cellPhone, totalDebt, email }: userData ) => {


 const userData: userData = {
    name,
    monthsPayed,
    cellPhone: cellPhone ? cellPhone : 0 ,
    totalDebt: totalDebt ? totalDebt : 0 ,
    email
 }

 console.log(userData, "USER DATA DB")

 try{
    
    const document = doc(firestoreDB, "Users", email )
  
    let dataUpdated = await setDoc(document, userData)
  
    return dataUpdated


 }catch(error){
  console.log("ERROR AT FILE UPLOAD", error)
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