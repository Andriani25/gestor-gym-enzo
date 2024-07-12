"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import the functions you need from the SDKs you need
const app_1 = require("firebase/app");
const dotenv_1 = __importDefault(require("dotenv"));
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
dotenv_1.default.config();
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.FIREBASE_KEY,
    authDomain: "gestor-gym.firebaseapp.com",
    projectId: "gestor-gym",
    storageBucket: "gestor-gym.appspot.com",
    messagingSenderId: "1072497750401",
    appId: "1:1072497750401:web:0ff7454cd81c8639ebf880"
};
// Initialize Firebase
const db = (0, app_1.initializeApp)(firebaseConfig);
exports.default = db;
