// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
    initializeAuth,
    getReactNativePersistence,
  } from 'firebase/auth';
  import AsyncStorage from '@react-native-async-storage/async-storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBKPBXzxBP0YitOpDnmNeN5VgcsuR6jqt8",
  authDomain: "social-app-raa.firebaseapp.com",
  projectId: "social-app-raa",
  storageBucket: "social-app-raa.firebasestorage.app",
  messagingSenderId: "586089073423",
  appId: "1:586089073423:web:9c9b0ac626b2381547cc7a",
  measurementId: "G-MYV3C9VJZT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export { auth };