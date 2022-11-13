// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAYt9_L_m98wx-Kf6hmEuQ1sRai_i0v9nA",
  authDomain: "next-learn-b086a.firebaseapp.com",
  projectId: "next-learn-b086a",
  storageBucket: "next-learn-b086a.appspot.com",
  messagingSenderId: "200855052662",
  appId: "1:200855052662:web:fa292c368773d230c31a57"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const db = getFirestore()
const auth = getAuth()

export default app
export { auth, db }