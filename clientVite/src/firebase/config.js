import {getStorage}from'firebase/storage';
import { getFirestore } from "firebase/firestore"
import { initializeApp } from "firebase/app"



// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBUgBK24uS3Jl1v0oBrOwsXyF4XyCvtMTw",
    authDomain: "volunteer-project-3a891.firebaseapp.com",
    projectId: "volunteer-project-3a891",
    storageBucket: "volunteer-project-3a891.appspot.com",
    messagingSenderId: "188039634523",
    appId: "1:188039634523:web:b9b68919e82bce3e1ae97e",
    measurementId: "G-KR6LDBJNHP"
  };
  const app=initializeApp(firebaseConfig)
  export const db = getFirestore(app);
  export const storage = getStorage(app);
