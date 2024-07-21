"use strict";
// Import the functions you need from the SDKs you need
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.getAllUsers = exports.getFirebaseApp = exports.initializeFirebaseApp = void 0;
const app_1 = require("firebase/app");
const dotenv_1 = __importDefault(require("dotenv"));
const firestore_1 = require("firebase/firestore");
dotenv_1.default.config();
const { FIREBASE_KEY, AUTH_DOMAIN, PROJECT_ID, STORAGE_BUCKET, MESSAGING_SENDER_ID, APP_ID } = process.env;
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: FIREBASE_KEY,
    authDomain: AUTH_DOMAIN,
    projectId: PROJECT_ID,
    storageBucket: STORAGE_BUCKET,
    messagingSenderId: MESSAGING_SENDER_ID,
    appId: APP_ID
};
let app;
let firestoreDB;
const initializeFirebaseApp = () => {
    try {
        app = (0, app_1.initializeApp)(firebaseConfig);
        firestoreDB = (0, firestore_1.getFirestore)();
    }
    catch (error) {
        console.log('Error at initializeFirebaseApp');
    }
};
exports.initializeFirebaseApp = initializeFirebaseApp;
const getFirebaseApp = () => app;
exports.getFirebaseApp = getFirebaseApp;
// Upload Firebase Data
const getAllUsers = async () => {
    try {
        const collectionData = await (0, firestore_1.getDocs)((0, firestore_1.collection)(firestoreDB, "Users"));
        let users = [];
        const allUsers = collectionData.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            users.push(doc.data());
        });
        return users;
    }
    catch (error) {
        console.log("Error at getting all users!");
    }
};
exports.getAllUsers = getAllUsers;
const updateUser = async ({ name, monthsPayed, cellPhone, totalDebt, email }) => {
    const userData = {
        name,
        monthsPayed,
        cellPhone: cellPhone ? cellPhone : 0,
        totalDebt: totalDebt ? totalDebt : 0,
        email
    };
    console.log(userData, "USER DATA DB");
    try {
        const document = (0, firestore_1.doc)(firestoreDB, "Users", email);
        let dataUpdated = await (0, firestore_1.setDoc)(document, userData);
        return dataUpdated;
    }
    catch (error) {
        console.log("ERROR AT FILE UPLOAD", error);
    }
};
exports.updateUser = updateUser;
const deleteUser = async (email) => {
    if (email) {
        try {
            await (0, firestore_1.deleteDoc)((0, firestore_1.doc)(firestoreDB, 'Users', email));
            return console.log("User deleted");
        }
        catch (error) {
            return console.log('Delete process error!');
        }
    }
    return console.log('Email not founded');
};
exports.deleteUser = deleteUser;
