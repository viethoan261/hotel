// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyAnNeMRDM_WN7L3aV-Yn55ylQoFfpCyoa8",
  authDomain: "hotel-app-cee07.firebaseapp.com",
  projectId: "hotel-app-cee07",
  storageBucket: "hotel-app-cee07.appspot.com",
  messagingSenderId: "142763268665",
  appId: "1:142763268665:web:4dd5271318ed0ff048cbe8",
  measurementId: "G-HY03SXRZ0N",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
