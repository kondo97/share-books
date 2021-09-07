import firebase from "firebase/app"
import "firebase/auth"
import 'firebase/firestore'
import 'firebase/functions'

if (!firebase.apps.length) {
 firebase.initializeApp({
  apiKey: "AIzaSyCaon5WazsZTgiaKg5_NteSt-zM1ojyQfM",
  authDomain: "sharehondana.firebaseapp.com",
  projectId: "sharehondana",
  storageBucket: "sharehondana.appspot.com",
  messagingSenderId: "990162981353",
  appId: "1:990162981353:web:4d2a98f63f129780803b78",
  measurementId: "G-P84554ZRXJ"
 })
}

export const functions = firebase.functions();

export default firebase