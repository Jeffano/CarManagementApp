// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDsC703MsX0o9XJzDUgH_W0SCM4Zp3z9C0",
  authDomain: "model-car-management-system.firebaseapp.com",
  projectId: "model-car-management-system",
  storageBucket: "model-car-management-system.appspot.com",
  messagingSenderId: "812912365260",
  appId: "1:812912365260:web:765869b95a812576e0bc69",
  measurementId: "G-5VE8YN7NV0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;