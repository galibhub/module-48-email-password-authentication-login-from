// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCNvuLOsxpT5bchGf1V6XmkvOrBF2I09ok",
  authDomain: "email-password-auth-12318.firebaseapp.com",
  projectId: "email-password-auth-12318",
  storageBucket: "email-password-auth-12318.firebasestorage.app",
  messagingSenderId: "1058339825913",
  appId: "1:1058339825913:web:342cef2d5acc3639861a28",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
